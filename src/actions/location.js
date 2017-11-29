import { pageSelector } from '../reducers/location.js';

export const UPDATE_LOCATION = 'UPDATE_LOCATION';

export const updateLocation = (location) => (dispatch, getState) => {
  dispatch({
    type: UPDATE_LOCATION,
    location
  });

  // NOTE: The below actions need to be created with the updated state (i.e. the state
  // with the new location.path), so they cannot be combined with UPDATE_LOCATION.
  switch (pageSelector(getState())) {
    case 'list':
      import('../fragments/list.js').then(module => {
        dispatch(module.fetchList(module.currentListSelector(getState())));
      });
      break;
    case 'user':
      import('../fragments/user.js').then(module => {
        dispatch(module.fetchUser(module.currentUserSelector(getState())));
      });
      break;
    case 'item':
      import('../fragments/item.js').then(module => {
        dispatch(module.fetchItem(module.currentItemSelector(getState())));
      });
      break;
  }
};

export const pushState = (href) => (dispatch) => {
  window.history.pushState({}, '', href);
  dispatch(updateLocation(window.location));
};

export const replaceState = (href) => (dispatch) => {
  window.history.replaceState({}, '', href);
  dispatch(updateLocation(window.location));
};
