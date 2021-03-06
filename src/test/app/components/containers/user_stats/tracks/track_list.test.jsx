import _ from 'lodash';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import React from 'react';
import renderer from 'react-test-renderer';

import {
  trackList as componentProps,
} from './../../../../../test_utils/components_props';
import initialState from './../../../../../test_utils/initial_state';
import { mockTopTracks } from './../../../../../test_utils/mock_data';
import TrackList, {
  PureTrackList,
/* eslint-disable-next-line max-len */
} from './../../../../../../app/components/containers/user_stats/tracks/track_list';

describe('App Components - Track List', () => {
  const mockStore = configureStore();
  let store;
  beforeAll(() => {
    store = mockStore(initialState);
  });

  describe('Snapshots', () => {
    let props;
    beforeEach(() => {
      props = _.cloneDeep(componentProps);
    });

    it('renders with some tracks', () => {
      props.tracks = _.cloneDeep(mockTopTracks);
      const rendered = renderer.create((
        <Provider store={store}>
          <PureTrackList {...props} />
        </Provider>
      )).toJSON();
      expect(rendered).toMatchSnapshot();
    });

    it('renders with some tracks mobile', () => {
      props.deviceMobile = true;
      props.tracks = _.cloneDeep(mockTopTracks);
      const rendered = renderer.create((
        <Provider store={store}>
          <PureTrackList {...props} />
        </Provider>
      )).toJSON();
      expect(rendered).toMatchSnapshot();
    });

    it('renders while reloading', () => {
      props.reloading = true;
      const rendered = renderer.create(<PureTrackList {...props} />).toJSON();
      expect(rendered).toMatchSnapshot();
    });

    it('renders with error', () => {
      props.error = 'Some error';
      const rendered = renderer.create((
        <Provider store={store}>
          <PureTrackList {...props} />
        </Provider>
      )).toJSON();
      expect(rendered).toMatchSnapshot();
    });
  });

  describe('Provider', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount((
        <Provider store={store}>
          <TrackList />
        </Provider>
      ));
    });

    it('renders', () => {
      expect(wrapper.find(PureTrackList).length).toEqual(1);
    });

    it('matches initial state', () => {
      expect(Object.keys(wrapper.find(PureTrackList).props()))
        .toEqual(Object.keys(componentProps));
    });
  });
});
