import { useToast } from "@chakra-ui/react"

export const ToastMessage = () => {
  const toast = useToast();
  const toastMessage = (res) => {
    let message ;
    let status;
    if(res.status === 200){
      message = res.message;
      status = 'success' ;
    }else{
      message = res.error;
      status ='error';
    }
    toast({
      title: status,
      description:message,
      status: status,
      duration: 1000,
      isClosable: true,
    })
  }
  return { toastMessage };
}