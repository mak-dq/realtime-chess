import { Button, Stack } from '@mui/material';
import Link from 'next/link';
import { ReactNode } from 'react';

interface textIcon {
  text: string;
  icon: ReactNode;
  route: string;
}

export default function MenuButton(props: textIcon) {
  return (
    <>
      <Link href={props.route} passHref>
        <Button
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            color: 'white',
            borderColor: 'white',
            fontSize: '12px',
            width: '100%',
            height: '42px',
          }}
          variant="outlined"
          startIcon={props.icon}
        >
          {props.text}
        </Button>
      </Link>
    </>
  );
}
