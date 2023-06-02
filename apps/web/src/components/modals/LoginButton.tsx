
import type { FC } from 'react';
import {  useGlobalModalStateStore} from '~ui';
import { Button } from '../ui/button/Button';




export const LoginButton: FC = () => {
  const setShowLoginModal = useGlobalModalStateStore(
    (state) => state.setLoginModal
  );

  return (
    <Button
      // icon={
      //   <img
      //     className="mr-0.5 h-4 w-4"
      //     height={16}
      //     width={16}
      //     src="/lens.png"
      //     alt="Lens Logo"
      //   />
      // }
      onClick={() => {
        setShowLoginModal(true);
      }}
      size="md"
      variant="primary"
      data-testid="login-button"
    >
      <h4>Join</h4>
    </Button>
  );
};
