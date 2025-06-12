import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", padding: 15 },
  logo: { width: 150, height: 40, resizeMode: 'contain', alignSelf: 'center', marginBottom: 10 },
  iconButton: { 
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10, },
  icon: { width: 30, height: 30, resizeMode: 'contain', alignItems:"center",tintColor:"white" },
  dropdownRow: { flexDirection: 'column', marginBottom: 10 },
  pickerWrapper: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 5,
    paddingHorizontal: 15,
    height: 50,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#000',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40
  },
  searchButton: {
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 40,
    marginBottom: 10,
    marginTop:10,
    height: 46
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
    padding: 10,
    margin: 5
  },
  poster: { width: 80, height: 120, borderRadius: 4, marginRight: 10 },
  title: { fontWeight: 'bold', color: '#000' },
  date: { color: '#555', marginVertical: 4 },
  overview: { color: '#333' },
  loadMore: {
    backgroundColor: '#00BFFF',
    alignItems: 'center',
    padding: 12,
    borderRadius: 6,
    marginTop: 10,
  },
  container2: {
    backgroundColor: '#00B4E4',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: "#2f8cb8",
  },
  poster2: {
    margin: 10,
    width: 105,
    height: 135,
    borderRadius: 7,
  },
  title2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  },
  meta: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  scoreCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  scoreText: {
    fontWeight: 'bold',
    color: '#000'
  },
  userScore: {
    marginLeft: 12,
    color: '#fff',
    fontWeight: '600',
  },
  tagline: {
    fontStyle: 'italic',
    color: '#fff',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 12,
    marginBottom: 4,
  },
  overview2: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
  },
  profileBox: {
    backgroundColor: '#042541',
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 22,
    alignItems: 'center',
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  profileName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  profileSince: {
    color: 'white',
    fontSize: 12,
  },
  watchlistBtn: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
  },
  watchlistText: {
    color: '#007AFF',
    fontWeight: '600',
    marginLeft: 6,
  },
  view_row: {
    flexDirection: "row"
  },
  view_column: {
    flexDirection: "column",
    justifyContent: "space-between"
  },
  view_between: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 8,
    marginVertical: 2
  },
  view_padding:
  {padding: 15},
  watchlistButton: {
  padding: 10,
  borderWidth: 1,
  borderRadius: 6,
  marginTop: 10,
  alignItems: 'center',
},

watchlistItem: {
  flexDirection: 'row',
  padding: 10,
  marginVertical: 5,
  marginHorizontal: 5,
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  backgroundColor: '#fff',
},

watchlistPoster: {
  width: 60,
  height: 90,
  marginRight: 10,
  borderRadius: 6,
},

movieTitle: {
  fontWeight: 'bold',
  fontSize: 14,
  marginBottom: 4,
},

movieDate: {
  fontSize: 12,
  color: '#666',
},

movieOverview: {
  fontSize: 12,
  color: '#333',
},

emptyText: {
  textAlign: 'center',
  marginTop: 20,
  fontSize: 16,
  color: '#888',
},
filterRow: {
  flexDirection: 'row',
  padding: 10,
  paddingLeft: 16,
  alignItems: 'center',
  backgroundColor: '#f2f2f2',
},
filterLabel: {
  fontWeight: 'bold',
  marginRight: 10,
},
filterButton: {
  marginRight: 10,
  color: '#007BFF',
},
castCard: {
  width: 100,
  margin: 6,
  alignItems: 'flex-start',
  backgroundColor:"white"
},
castImage: {
  width: 100,
  height: 150,
  borderRadius: 5,
},
castName: {
  fontWeight: 'bold',
  fontSize: 12,
  marginTop: 5,
  marginHorizontal: 5,
  color: 'black',
  textAlign: 'left',
},
castCharacter: {
  fontSize: 10,
  marginHorizontal: 5,
  color: 'black',
  textAlign: 'left',
},
sectionTitle2: {
  fontSize: 16,
  fontWeight: 'bold',
  marginVertical: 10,
  color: '#fff',
},
elevation: {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 4
},
});
