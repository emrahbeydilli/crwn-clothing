export const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log('%ctype: ',"color:green",action.type, );
  console.log('%cpayload: ',"color:red", action.payload);
  console.log('%ccurrentState: ',"color:blue",  store.getState());

  next(action);

  console.log('%cnext state: ', "color:maroon",store.getState());
};