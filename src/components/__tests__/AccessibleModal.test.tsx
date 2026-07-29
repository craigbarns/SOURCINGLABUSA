import { useRef, useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { AccessibleModal } from '@/components/AccessibleModal';

const ModalHarness = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Ouvrir la modale
      </button>
      <AccessibleModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Prévisualisation"
        initialFocusRef={closeRef}
      >
        <button ref={closeRef} type="button" onClick={() => setIsOpen(false)}>
          Fermer
        </button>
        <button type="button">Action secondaire</button>
      </AccessibleModal>
    </>
  );
};

describe('AccessibleModal', () => {
  it('se ferme avec Échap et restaure le focus au déclencheur', async () => {
    const user = userEvent.setup();
    render(<ModalHarness />);
    const trigger = screen.getByRole('button', { name: 'Ouvrir la modale' });

    await user.click(trigger);
    expect(screen.getByRole('dialog', { name: 'Prévisualisation' })).toBeVisible();

    await user.keyboard('{Escape}');

    expect(
      screen.queryByRole('dialog', { name: 'Prévisualisation' }),
    ).not.toBeInTheDocument();
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it('reboucle le focus clavier dans la modale', async () => {
    vi.spyOn(HTMLElement.prototype, 'getClientRects').mockReturnValue({
      length: 1,
      item: () => null,
    } as unknown as DOMRectList);
    const user = userEvent.setup();
    render(<ModalHarness />);

    await user.click(
      screen.getByRole('button', { name: 'Ouvrir la modale' }),
    );
    const closeButton = screen.getByRole('button', { name: 'Fermer' });
    const secondaryButton = screen.getByRole('button', {
      name: 'Action secondaire',
    });
    await waitFor(() => expect(closeButton).toHaveFocus());

    secondaryButton.focus();
    await user.tab();

    expect(closeButton).toHaveFocus();
  });
});
