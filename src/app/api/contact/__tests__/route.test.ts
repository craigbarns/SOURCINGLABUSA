// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('server-only', () => ({}));
const { getAdmin, insert } = vi.hoisted(() => ({ getAdmin: vi.fn(), insert: vi.fn() }));
vi.mock('@/lib/server/supabase', () => ({ getSupabaseAdminClient: getAdmin }));
vi.mock('@/lib/server/rate-limit', () => ({ consumeRateLimit: () => ({ allowed: true }), getRequestClientKey: () => 'test' }));

import { POST } from '@/app/api/contact/route';

const brief = { name: 'Jane Doe', email: 'jane@example.com', projectType: 'packaging' };
function request(body: unknown, origin = 'https://sourcinglabusa.com') {
  return new Request('https://sourcinglabusa.com/api/contact', { method: 'POST', headers: { origin, host: 'sourcinglabusa.com', 'content-type': 'application/json' }, body: JSON.stringify(body) });
}

describe('contact delivery acknowledgement', () => {
  beforeEach(() => { getAdmin.mockReset(); insert.mockReset(); });

  it('returns 503 when storage is unconfigured and never logs personal details', async () => {
    const logged = vi.spyOn(console, 'error').mockImplementation(() => {});
    const info = vi.spyOn(console, 'info').mockImplementation(() => {});
    getAdmin.mockReturnValue(null);
    const response = await POST(request(brief));
    expect(response.status).toBe(503);
    expect(JSON.stringify([...logged.mock.calls, ...info.mock.calls])).not.toContain('jane@example.com');
    expect(JSON.stringify([...logged.mock.calls, ...info.mock.calls])).not.toContain('Jane Doe');
  });

  it('acknowledges a stored lead only after the database insert completes', async () => {
    getAdmin.mockReturnValue({ from: () => ({ insert }) });
    insert.mockResolvedValue({ error: null });
    const response = await POST(request(brief));
    expect(response.status).toBe(201);
    expect(await response.json()).toMatchObject({ delivery: ['database'] });
    expect(insert).toHaveBeenCalledWith(expect.objectContaining({ email: 'jane@example.com', project_type: 'packaging' }));
  });

  it('drops a filled honeypot before accessing storage', async () => {
    const response = await POST(request({ ...brief, botField: 'automated' }));
    expect(response.status).toBe(201);
    expect(await response.json()).toMatchObject({ delivery: [] });
    expect(getAdmin).not.toHaveBeenCalled();
  });

  it('validates market-entry data on the server and stores its qualification without a migration', async () => {
    const invalid = await POST(request({ journey: 'market_entry', ...brief, company: '', country: '', objectives: 'x' }));
    expect(invalid.status).toBe(400);
    expect(getAdmin).not.toHaveBeenCalled();
    getAdmin.mockReturnValue({ from: () => ({ insert }) });
    insert.mockResolvedValue({ error: null });
    const response = await POST(request({ journey: 'market_entry', name: 'Jane Doe', email: 'jane@example.com', company: 'Example', country: 'China', productCategory: 'Boxes', objectives: 'Find U.S. wholesale distributors.', expansionBudget: 'USD 20000' }));
    expect(response.status).toBe(201);
    expect(insert).toHaveBeenCalledWith(expect.objectContaining({ project_type: 'other', message: expect.stringContaining('Estimated expansion budget and currency: USD 20000') }));
  });

  it('retains the same-origin protection', async () => {
    expect((await POST(request(brief, 'https://other.example'))).status).toBe(403);
    expect(getAdmin).not.toHaveBeenCalled();
  });
});
