import { Button, Stack } from '@mui/material';
import Link from 'next/link';
type Props = {
  direction: 'row' | 'column';
};

export default function LoginSignup({ direction }: Props) {
  return (
    <>
      <Stack direction={direction} gap={2}>
        <Link href="/register" passHref>
          <Button
            variant="contained"
            sx={{
              '&:hover': {
                backgroundColor: '#1485bb',
              },
              backgroundColor: '#147aab',
              width: '100%',
            }}
            size="small"
          >
            Register
          </Button>
        </Link>
        <Link href="/login" passHref>
          <Button
            variant="contained"
            sx={{
              '&:hover': {
                backgroundColor: '#c1ac1a',
              },
              backgroundColor: '#c59e12',
              width: '100%',
            }}
            size="small"
          >
            Login
          </Button>
        </Link>
      </Stack>
    </>
  );
}
