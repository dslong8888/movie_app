import React, { FC, useEffect, useState } from 'react';
import {
  View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator,StatusBar, FlatList, Alert
} from 'react-native';
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import styles from '../theme/styles2';
import { Icon, iconRegistry, IconTypes } from "../components"
import { useAppTheme } from "@/utils/useAppTheme"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
var GLOBAL = require("@/utils/globalVariable");
import NetInfo from '@react-native-community/netinfo';

export const DetailScreen : FC<DemoTabScreenProps<"Detail">> = ({route, navigation}) => {
  const { movieId } = route.params;
  console.log("movieId ", movieId);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [credits, setCredits] = useState([]);
  useEffect(() => {
    fetchMovieDetails();
    fetchCredits();
    checkWatchlist();
  }, []);
  
  const checkWatchlist = async () => {
    try {
      const data = await AsyncStorage.getItem('watchlist');
      const list = data ? JSON.parse(data) : [];
      const exist = list.some(item => item.id === movieId);
      setInWatchlist(exist);
    } catch (err) {
      console.error("Error checking watchlist:", err);
    }
  };
  const fetchCredits = async () => {
    //Check internet connection
    const netState = await NetInfo.fetch();
    if (!netState.isConnected) {
      console.warn("No internet connection. Skipping fetch.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
        headers: {
          Authorization: `Bearer ${GLOBAL.TMDB_API_KEY}`,
          accept: 'application/json'
        }
      });
      const data = await res.json();
      setCredits(data.cast?.slice(0, 6));
    } catch (e) {
      console.error("Failed to fetch credits", e);
    }
  };
  const fetchMovieDetails = async () => {
    //Check internet connection
    const netState = await NetInfo.fetch();
    if (!netState.isConnected) {
      console.warn("No internet connection. Skipping fetch.");
      Alert.alert("No internet connection.");
      navigation.goBack();
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
        headers: {
          Authorization: `Bearer ${GLOBAL.TMDB_API_KEY}`,
          accept: 'application/json'
        }
      });
      const data = await res.json();
      setMovie(data);
      console.log("Details ",data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const toggleWatchlist = async () => {
    try {
      let watchlist = await AsyncStorage.getItem('watchlist');
      let parsed = watchlist ? JSON.parse(watchlist) : [];
  
      if (inWatchlist) {
        parsed = parsed.filter(item => item.id !== movie.id);
      } else {
        parsed.push(movie);
      }
  
      await AsyncStorage.setItem('watchlist', JSON.stringify(parsed));
      setInWatchlist(!inWatchlist);
    } catch (e) {
      console.error('Failed to update watchlist', e);
    }
  };

  if (loading || !movie) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }
  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#042541' }}>
       <StatusBar barStyle="dark-content" backgroundColor="#fff" />
    <ScrollView style={[styles.container,{padding:0}]}>
      <View style={styles.view_padding}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      </View>
      
      <View style={[styles.header,{marginBottom:0}]}>
      <View>
        <View style={[styles.view_row,{width:"100%", paddingVertical:8}]}>
        <TouchableOpacity style={[styles.iconButton,{width:"20%",alignSelf:"center", alignContent:'center', alignItems:"flex-start"}]} onPress={handleBack}>
          <Image source={require('../../assets/icons/back.png')} style={styles.icon} />
          </TouchableOpacity>
          <Text style={[styles.title2,{alignSelf:"center",width:"60%", textAlign:"center"}]}>
              {movie.title} ({movie.release_date?.substring(0, 4)})
            </Text>
            <View style={{width:"20%"}}></View>
        </View>
        <View style={styles.header}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
          style={styles.poster2}
        />
        <View style={{marginLeft: 3, padding: 5 }}>
          <Text style={styles.meta}>
            {movie.release_date} • {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
          </Text>
          <Text style={styles.meta}>{movie.genres?.map(g => g.name).join(', ')}</Text>
          <Text style={styles.meta}>Status: {movie.status}</Text>
          <Text style={styles.meta}>Original Language: {movie.original_language?.toUpperCase()}</Text>
        </View>
        </View>
        </View>
      </View>
      <View style={[styles.view_padding,{backgroundColor:"#00B4E4"}]}>
      <View style={[styles.scoreRow,{backgroundColor:"#00B4E4"}]}>
        <View style={styles.scoreCircle}>
          <Text style={styles.scoreText}>{Math.round(movie.vote_average * 10)}%</Text>
        </View>
        <Text style={styles.userScore}>User Score</Text>
      </View>

      {movie.tagline ? <Text style={styles.tagline}>{movie.tagline}</Text> : null}

      <Text style={styles.sectionTitle}>Overview</Text>
      <Text style={styles.overview2}>{movie.overview}</Text>

    <TouchableOpacity
      onPress={toggleWatchlist}
      style={[styles.watchlistButton, { backgroundColor: inWatchlist ? '#aaa' : 'white', borderColor: '#00B4E4' }]}
    >
      <Text style={{ color: inWatchlist ? 'white' : '#00B4E4' }}>
        {inWatchlist ? '✓ In Watchlist' : '+ Add To Watchlist'}
      </Text>
    </TouchableOpacity>


      </View>
   
      <View style={styles.view_padding}>
       <Text style={styles.filterLabel}>Top Billed Cast</Text>
       </View>
       <FlatList
        style={{marginVertical: 5, marginHorizontal: 10}}
        horizontal
        data={credits}
        keyExtractor={(item) => item.cast_id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.castCard,styles.elevation]}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w185${item.profile_path}` }}
              style={styles.castImage}
            />
            <Text style={styles.castName}>{item.name}</Text>
            <Text style={styles.castCharacter}>{item.character}</Text>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />
      
    </ScrollView>
    </SafeAreaView>
  );
};
