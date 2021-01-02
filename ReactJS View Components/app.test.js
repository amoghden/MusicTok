import React from 'react';
import renderer from 'react-test-renderer';


import  HomeScreen  from './screens/HomeScreen';
import FindScreen from './screens/FindScreen'
import SearchScreen from './screens/SearchScreen'
import DiscoverScreen from './screens/DiscoverScreen'
import SavedScreen from './screens/SavedScreen'

/**
 * Snapshot test for Home Screen
 */
test('Home screen renders correctly', () => {
  const tree = renderer.create(<HomeScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});


/**
 * Snapshot test for Find Screen
 */
test('Find Screen renders correctly', () => {
  const tree = renderer.create(<FindScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

/**
 * Snapshot test for Search Screen
 */
test('Search Screen renders correctly', () => {
  const tree = renderer.create(<SearchScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

/**
 * Snapshot test for Discover Screen
 */
test('Discover Screen renders correctly', () => {
  const tree = renderer.create(<DiscoverScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});


/**
 * Snapshot test for Trending Screen
 */
test('Trending Screen renders correctly', () => {
  const tree = renderer.create(<TrendingScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

/**
 * Snapshot test for Recommended Screen
 */
test('Recommended Screen renders correctly', () => {
  const tree = renderer.create(<RecommendedScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});


/**
 * Snapshot test for Saved Screen
 */
test('Saved Screen renders correctly', () => {
  const tree = renderer.create(<SavedScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});


});
