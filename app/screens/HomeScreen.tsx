import React, { FC, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  StatusBar,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { DemoTabScreenProps } from '../navigators/DemoNavigator';
import styles from '../theme/styles2';
import { Icon, iconRegistry, IconTypes } from "../components"
import { useAppTheme } from "@/utils/useAppTheme"
import { SafeAreaView } from 'react-native-safe-area-context';
var GLOBAL = require("@/utils/globalVariable");
import NetInfo from '@react-native-community/netinfo';

export const HomeScreen: FC<DemoTabScreenProps<'HomeMain'>> = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('now_playing');
  const [sortBy, setSortBy] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const {
    themed,
    theme: { colors },
  } = useAppTheme()

  const navigation = useNavigation();

  const fetchMovies = async (append = false) => {
    setLoading(true);
  
    //Check internet connection
    const netState = await NetInfo.fetch();
    if (!netState.isConnected) {
      console.warn("No internet connection. Skipping fetch.");
      Alert.alert("No internet connection.");
      setLoading(false);
      return;
    }
  
    try {
      let url = '';
      const today = new Date().toISOString().split('T')[0];
      const baseParams = `language=en-US&page=${page}&with_release_type=2|3&release_date.lte=${today}`;
  
      if (search) {
        url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(search)}&language=en-US&page=${page}`;
      } else {
        switch (category) {
          case 'now_playing':
            url = `https://api.themoviedb.org/3/discover/movie?${baseParams}&sort_by=${sortBy}&primary_release_date.lte=${today}`;
            break;
          case 'popular':
            url = `https://api.themoviedb.org/3/discover/movie?${baseParams}&sort_by=${sortBy}&vote_count.gte=1000`;
            break;
          case 'upcoming':
            url = `https://api.themoviedb.org/3/discover/movie?${baseParams}&sort_by=${sortBy}&primary_release_date.gte=${today}`;
            break;
          default:
            url = `https://api.themoviedb.org/3/discover/movie?${baseParams}&sort_by=${sortBy}`;
            break;
        }
      }
  
      // fetch timeout helper
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 秒超时
  
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + GLOBAL.TMDB_API_KEY,
        },
        signal: controller.signal,
      });
  
      clearTimeout(timeoutId);
  
      const json = await res.json();
      setMovies(append ? [...movies, ...json.results] : json.results);
      setHasMore(page < json.total_pages);
    } catch (err) {
      if (err.name === 'AbortError') {
        console.warn('Request timed out.');
      } else {
        console.error('Fetch failed:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchMovies();
  }, [category, sortBy]);

  const handleSearch = () => {
    setPage(1);
    fetchMovies();
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
      fetchMovies(true);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card,styles.elevation]}
      onPress={() => navigation.navigate('Detail', { movieId: item.id })}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.poster}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.release_date}</Text>
        <Text style={styles.overview} numberOfLines={2}>{item.overview}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#042541' }}>
     <StatusBar barStyle="dark-content" backgroundColor="#fff" />
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      
        <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={category}
          onValueChange={(e) => {
            setCategory(e)
            setSearch('')
          }}
          style={styles.picker}
        >
          <Picker.Item label="Now Playing" value="now_playing" />
          <Picker.Item label="Popular" value="popular" />
          <Picker.Item label="Upcoming" value="upcoming" />
        </Picker>
      </View>

      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={sortBy}
          onValueChange={(e) => {
            setSortBy(e)
            setSearch('')
          }}
          style={styles.picker}
        >
          <Picker.Item label="Sort by" value="" />
          <Picker.Item label="Popularity" value="popularity.desc" />
          <Picker.Item label="Release Date" value="release_date.desc" />
          <Picker.Item label="Vote Average" value="vote_average.desc" />
        </Picker>
      </View>

      
      <View style={styles.pickerWrapper}>
      <TextInput
        placeholder="Search..."
        placeholderTextColor="#000"
        value={search}
        onChangeText={setSearch}
        style={styles.input}
      />
      </View>
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={{ color: '#000' }}>Search</Text>
      </TouchableOpacity>

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={{paddingVertical: 140, paddingHorizontal: 30}}>
            <Icon
              icon="hidden"
              color={colors.tint }
            />
            <Text style={[styles.title, { color: "#a8a29e" }]}>
              Don't have any movie at the moment!
            </Text>
          </View>
        }
        ListFooterComponent={
          hasMore ? (
            <TouchableOpacity onPress={loadMore} style={styles.loadMore}>
              <Text style={{ color: '#fff' }}>Load More</Text>
            </TouchableOpacity>
          ) : null
        }
      />
    </View>
    </SafeAreaView>
  );
};
