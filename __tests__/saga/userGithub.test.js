import SagaTester from 'redux-saga-tester';
import MockAdapter from 'axios-mock-adapter';

import api from '../../src/services/api';
import rootSaga from '../../src/store/sagas';
import * as actions from '../../src/store/userActions';

const userGithubFixture = require('./fixtures/userGithub.json');

describe('Testing User Github SAGA', () => {
  let sagaTester = null;
  let apiMock = null;

  beforeEach(() => {
    sagaTester = new SagaTester({});
    apiMock = new MockAdapter(api.axiosInstance);

    sagaTester.start(rootSaga);
  });

  it('can add user', async () => {
    apiMock.onGet('/users/diego3g')
      .reply(200, userGithubFixture['/users/diego3g']);

    sagaTester.dispatch(actions.addUserRequest('diego3g'));

    await sagaTester.waitFor(actions.addUserSuccess().type);

    expect(sagaTester.getLatestCalledAction())
      .toEqual(actions.addUserSuccess(userGithubFixture['/users/diego3g']));
  });

  it('throws error when user doesnt exists', async () => {
    apiMock.onGet('/users/fail').reply(400);

    sagaTester.dispatch(actions.addUserRequest('fail'));

    await sagaTester.waitFor(actions.addUserFailure().type);

    expect(sagaTester.getLatestCalledAction())
      .toEqual(actions.addUserFailure());
  });
});