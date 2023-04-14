import { Button, Stack } from "@mui/material";

type Props = {
    direction: "row" | "column",
  }

export default function LoginSignup({direction}: Props) {
  return (
    <>
      <Stack direction={direction} gap={2}>
        <Button
          variant="contained"
          sx={{
            '&:hover': {
              backgroundColor: '#1485bb',
            },
            backgroundColor: '#147aab',
          }}
          size="small"
        >
          Register
        </Button>
        <Button
          variant="contained"
          sx={{
            '&:hover': {
              backgroundColor: '#c1ac1a',
            },
            backgroundColor: '#c59e12',
          }}
          size="small"
        >
          Login
        </Button>
      </Stack>
    </>
  );
}
