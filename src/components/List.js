/* Core */
import React from 'react';

/* Presentational */
import { View, Text, ScrollView, Button, AsyncStorage } from 'react-native';
import Post from './Post';

class List extends React.Component {
  state={
    posts: [], 
  }

  async componentDidMount() {
    const posts = JSON.parse(await AsyncStorage.getItem('@Root:posts'));

    this.setState({ posts });
  }

  renderPosts = () => (
    <ScrollView>
      { this.state.posts.map(post => <Post key={post.id} post={post} />) }
    </ScrollView>
  )

  addPost = () => {
    this.setState({
      posts: [
        ...this.state.posts,
        { id: Math.random(), title: 'A simple post', description: 'Thats only a simple post' }
      ]
    })
  }

  deletePost = (id) => {
    this.setState({
      posts: this.state.posts.filter(post => post.id !== id),
    })
  }

  savePosts = async () => {
    await AsyncStorage.setItem('@Root:posts', JSON.stringify(this.state.posts));
  }

  render() {
    return(
      <View>
        { this.state.posts.length > 0 
            ? this.renderPosts()
            : <Text>Nenhum post</Text>}
        <Button id="new" title="Add post" onPress={this.addPost} />
        <Button id="save" title="Save post" onPress={() => this.savePosts()} />
      </View>
    );
  }
}

export default List;
