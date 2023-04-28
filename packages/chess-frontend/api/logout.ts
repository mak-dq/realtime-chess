import axios from './instance';
import Swal from 'sweetalert2';

export const logoutUser = async () => {
  try {
    const response = await axios.post(`auth/logout`);
    console.log('logged-out', response.data);
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      customClass: { container: 'margin-top' },
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: 'success',
      title: 'Logged out successfully',
    });
    return response.data;
  } catch (err) {
    console.error('logoutError', err);
    return err;
  }
};
