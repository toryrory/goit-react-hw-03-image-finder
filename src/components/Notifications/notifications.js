import { toast } from 'react-toastify';

export const notifications = (hits, page, totalHits) => {
  if (hits.length === 0) {
    return toast.error(
      `We do not have such pictures, try to enter in a different way.`
    );
  }
  if (page === 1) {
    toast.success(`We have found ${totalHits} images!`); 
  }
};

export const onEmptyNotification = query => {
  if (!query) {
    toast.info('Search is empty!');
  }
};
