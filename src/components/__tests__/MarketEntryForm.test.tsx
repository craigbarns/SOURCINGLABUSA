import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { MarketEntryForm } from '@/components/MarketEntryForm';
import { trackEvent } from '@/lib/analytics';

vi.mock('next/navigation', () => ({ usePathname: () => '/us-sales-representation' }));
vi.mock('@/lib/analytics', async (importOriginal) => ({ ...await importOriginal<typeof import('@/lib/analytics')>(), trackEvent: vi.fn() }));
const fetchMock = vi.fn();
async function fill(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText('Your name *'), 'Jane Doe');
  await user.type(screen.getByLabelText('Professional email *'), 'jane@example.com');
  await user.type(screen.getByLabelText('Company *'), 'Example Manufacturing');
  await user.type(screen.getByLabelText('Country *'), 'France');
  await user.type(screen.getByLabelText('Product category *'), 'Boxes');
  await user.type(screen.getByLabelText('U.S. commercial objectives *'), 'Find U.S. wholesale distributors.');
}

describe('MarketEntryForm', () => {
  beforeEach(() => { fetchMock.mockReset(); vi.mocked(trackEvent).mockClear(); vi.stubGlobal('fetch', fetchMock); });

  it('sends distinct qualification to the server and existing notification channel without analytics PII', async () => {
    const user = userEvent.setup();
    fetchMock.mockImplementation((target: string) => Promise.resolve(target === '/api/contact'
      ? { ok: true, status: 201, json: vi.fn().mockResolvedValue({ delivery: ['database'] }) }
      : { ok: true, status: 200, text: vi.fn().mockResolvedValue('static page') }));
    render(<MarketEntryForm />);
    await fill(user);
    await user.click(screen.getByText('Add manufacturing and expansion details (optional)'));
    await user.type(screen.getByLabelText('Estimated expansion budget and currency'), 'EUR 30000');
    await user.click(screen.getByRole('button', { name: 'Request a U.S. Market Assessment' }));
    expect(await screen.findByText('Market-entry inquiry received.')).toBeInTheDocument();
    const request = JSON.parse(fetchMock.mock.calls.find(([target]) => target === '/api/contact')![1].body);
    expect(request).toMatchObject({ journey: 'market_entry', country: 'France', expansionBudget: 'EUR 30000', sourcePath: '/us-sales-representation' });
    const notification = new URLSearchParams(fetchMock.mock.calls.find(([target]) => target === '/contact.html')![1].body);
    expect(notification.get('message')).toContain('U.S. MARKET ENTRY / SALES REPRESENTATION INQUIRY');
    expect(notification.get('message')).toContain('Estimated expansion budget and currency: EUR 30000');
    expect(trackEvent).toHaveBeenCalledWith('generate_lead', expect.objectContaining({ lead_journey: 'market_entry', stored: true, notified: false }));
    expect(JSON.stringify(vi.mocked(trackEvent).mock.calls)).not.toContain('30000');
    expect(JSON.stringify(vi.mocked(trackEvent).mock.calls)).not.toContain('jane@example.com');
  });

  it('preserves values and an email fallback when neither channel acknowledges delivery', async () => {
    const user = userEvent.setup();
    fetchMock.mockImplementation((target: string) => Promise.resolve(target === '/api/contact'
      ? { ok: true, status: 201, json: vi.fn().mockResolvedValue({ delivery: [] }) }
      : { ok: true, status: 200, text: vi.fn().mockResolvedValue('static page') }));
    render(<MarketEntryForm />);
    await fill(user);
    await user.click(screen.getByRole('button', { name: 'Request a U.S. Market Assessment' }));
    const fallback = await screen.findByRole('link', { name: 'Send it by email instead' });
    expect(fallback.getAttribute('href')).toContain(encodeURIComponent('Find U.S. wholesale distributors.'));
    expect(screen.getByLabelText('Company *')).toHaveValue('Example Manufacturing');
    expect(screen.queryByText('Market-entry inquiry received.')).not.toBeInTheDocument();
    expect(vi.mocked(trackEvent).mock.calls.some(([name]) => name === 'generate_lead')).toBe(false);
  });

  it('keeps the Chinese manufacturer journey localized and serializes its locale', async () => {
    const user = userEvent.setup();
    fetchMock.mockImplementation((target: string) => Promise.resolve(target === '/api/contact'
      ? { ok: true, status: 201, json: vi.fn().mockResolvedValue({ delivery: ['database'] }) }
      : { ok: false, status: 503 }));
    render(<MarketEntryForm locale="zh" />);
    await user.click(screen.getByRole('button', { name: '申请美国市场评估' }));
    expect(await screen.findByText('请输入所在国家或地区，长度为 2 至 100 个字符。')).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
    await user.type(screen.getByLabelText('您的姓名 *'), '王小明');
    await user.type(screen.getByLabelText('工作邮箱 *'), 'buyer@example.com');
    await user.type(screen.getByLabelText('公司名称 *'), '示例制造公司');
    await user.type(screen.getByLabelText('所在国家或地区 *'), '中国');
    await user.type(screen.getByLabelText('产品类别 *'), '定制包装');
    await user.type(screen.getByLabelText('美国市场商业目标 *'), '寻找美国批发分销合作伙伴');
    await user.click(screen.getByRole('button', { name: '申请美国市场评估' }));
    expect(await screen.findByText('已收到您的美国市场咨询。')).toBeInTheDocument();
    expect(JSON.parse(fetchMock.mock.calls.find(([target]) => target === '/api/contact')![1].body)).toMatchObject({ journey: 'market_entry', locale: 'zh', country: '中国' });
    expect(new URLSearchParams(fetchMock.mock.calls.find(([target]) => target === '/contact.html')![1].body).get('locale')).toBe('zh');
  });

  it('does not submit an unqualified manufacturer inquiry', async () => {
    const user = userEvent.setup();
    render(<MarketEntryForm />);
    await user.click(screen.getByRole('button', { name: 'Request a U.S. Market Assessment' }));
    await waitFor(() => expect(screen.getByText('Please enter your country.')).toBeInTheDocument());
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
