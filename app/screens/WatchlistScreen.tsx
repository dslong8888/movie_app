
import React, { FC, useEffect, useState } from 'react';
import {
  View, Text, Image, TouchableOpacity, FlatList, StatusBar,
  ScrollView, TextInput
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../theme/styles2';
import { DemoTabScreenProps } from '../navigators/DemoNavigator';
var GLOBAL = require("@/utils/globalVariable");

export const WatchlistScreen: FC<DemoTabScreenProps<'Watchlist'>> = ({ navigation }) => {
  const [watchlist, setWatchlist] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [sortBy, setSortBy] = useState<'rating' | 'alphabetical' | 'release'>('rating');

  useEffect(() => {
    fetchUserDetails();
    const unsubscribe = navigation.addListener('focus', loadWatchlist);
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    loadWatchlist();
  }, [sortBy]);

  const fetchUserDetails = async () => {
    try {
      const res = await fetch('https://api.themoviedb.org/3/account/null', {
        headers: {
          Authorization: `Bearer ${GLOBAL.TMDB_API_KEY}`,
          accept: 'application/json'
        }
      });
      const data = await res.json();
      setUserDetails(data);
      console.log("account ",data);
    } catch (e) {
      console.error(e);
    }
  };

  const loadWatchlist = async () => {
    const data = await AsyncStorage.getItem('watchlist');
    let list = data ? JSON.parse(data) : [];

    if (sortBy === 'alphabetical') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'release') {
      list.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.vote_average - a.vote_average);
    }

    setWatchlist(list);
  };

  const removeFromWatchlist = async (id: number) => {
    const updated = watchlist.filter(item => item.id !== id);
    setWatchlist(updated);
    await AsyncStorage.setItem('watchlist', JSON.stringify(updated));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate("Home", {
      screen: "Detail",
      params: { movieId: item.id },
    })}>
    <View style={styles.watchlistItem}>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.watchlistPoster} />
      <View style={{ flex: 1 }}>
        <Text style={styles.movieTitle}>{item.title}</Text>
        <Text style={styles.movieDate}>{item.release_date}</Text>
        <Text style={styles.movieOverview}>{item.overview?.substring(0, 60)}...</Text>
      </View>
      <TouchableOpacity onPress={() => removeFromWatchlist(item.id)}>
        <Text style={{ color: 'red', fontWeight: 'bold' }}>✕</Text>
      </TouchableOpacity>
    </View>
    </TouchableOpacity>
  );
  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#042541' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView style={[styles.container, { padding: 0 }]}>
        <View style={styles.view_padding}>
          <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        </View>

        {userDetails && (
          <View style={styles.profileBox}>
            <View style={styles.view_column}>
            <TouchableOpacity style={[styles.iconButton,{width:"20%",alignSelf:"flex-start", alignContent:'center', alignItems:"flex-start"}]} onPress={handleBack}>
            <Image source={require('../../assets/icons/back.png')} style={styles.icon} />
            </TouchableOpacity>
            <View style={[styles.view_row,{paddingLeft: 20, paddingTop: 10}]}>
            <Image source={{
            uri: userDetails?.avatar?.tmdb?.avatar_path != null
              ? `https://image.tmdb.org/t/p/w185${userDetails?.avatar.tmdb.avatar_path}`
              : 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
          }} style={styles.profileImage} />
            <View>
              <Text style={styles.profileName}>{userDetails?.name || userDetails?.username || ''}</Text>
              <Text style={styles.profileSince}>Member since August 2023</Text>
            </View>
            </View>
            </View>
          </View>
        )}
        <View style={styles.view_padding}>
       <Text style={styles.filterLabel}>My Watchlist</Text>
       </View>
        <View style={styles.filterRow}>
          <Text style={styles.filterLabel}>Filter by:</Text>
          <TouchableOpacity onPress={() => setSortBy('rating')}><Text style={styles.filterButton}>Rating</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setSortBy('alphabetical')}><Text style={styles.filterButton}>Alphabetical</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setSortBy('release')}><Text style={styles.filterButton}>Release Date</Text></TouchableOpacity>
        </View>

        <View style={styles.container}>
          {watchlist.length === 0 ? (
            <Text style={styles.emptyText}>Your Watchlist is empty</Text>
          ) : (
            <FlatList
              data={watchlist}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItem}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
