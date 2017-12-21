/* Core */
import React from 'react';

/* Presentational */
import { View, Text, Button } from 'react-native';

// import styles from './styles';
const Post = ({ post, onDelete }) => (
  <View>
    <Text>{post.title}</Text>
    <Text>{post.description}</Text>

    <Button title="Delete post" onPress={() => onDelete(post.id)} />
  </View>
);

export default Post;
