export const ToastSuccess = (toast, name) => {
  toast.show(name, {
    type: 'custom',
    placement: 'top',
    duration: 2000,
    offset: 30,
    animationType: 'slide-in',
    data: {type: 'SUCCESS'},
  });
};

export const ToastError = (toast, name) => {
  toast.show(name, {
    type: 'custom',
    placement: 'top',
    duration: 2000,
    offset: 30,
    animationType: 'slide-in',
    data: {type: 'ERROR'},
  });
};
