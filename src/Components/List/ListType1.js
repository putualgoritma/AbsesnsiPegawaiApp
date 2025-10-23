import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {faUser, faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Colors from '../../Colors';
import ButtonCstm from '../../Components/Button/ButtonCstm';
import TextInpt from '../../Components/Input/TextInpt';
import API from '../../service';
import Loading from '../Loading';
import {OptimizedFlatList} from 'react-native-optimized-flatlist';

const ListType1 = props => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const [form, setForm] = useState({
    search: '',
  });
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState();

  const handleLoadMore = () => {
    if (props.lastPage >= props.currentPage + 1) {
      setLoading(true);
      API.getCustomer(404, props.currentPage + 1, search)
        .then(result => {
          if (result) {
            props.setUser([...props.user, ...result.data.data]);
            props.setLastPage(result.data.last_page);
            props.setCurrentPage(result.data.current_page);
            setLoading(false);
            console.log(result.data.current_page);
          }
        })
        .catch(e => {
          console.log(e.request);
          setLoading(false);
        });
    }
  };

  const renderItem = ({item}) => {
    // console.log('sddddd', props.user.length);
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Store', {data: item});
        }}
        style={styles.list}>
        <View style={styles.userImg}>
          <FontAwesomeIcon
            icon={faUser}
            size={windowWitdh * 0.1}
            color={Colors.white}
          />
        </View>

        <View>
          <Text style={{color: '#000000'}}>{item.nomorrekening}</Text>
          <Text style={{color: '#000000'}}>{item.namapelanggan}</Text>
          <Text style={{color: '#000000'}}>{item.NamaStatus}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const searchData = () => {
    setLoading(true);
    API.getCustomer(404, 1, form.search)
      .then(result => {
        if (result) {
          setSearch(form.search);
          props.setUser(result.data.data);
          props.setLastPage(result.data.last_page);
          props.setCurrentPage(result.data.current_page);
          setLoading(false);
        }
      })
      .catch(e => {
        console.log(e.request);
        setLoading(false);
      });
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.search}>
        <TextInpt width={0.6} type="search" form={form} setForm={setForm} />
        <TouchableOpacity style={styles.btnSearch} onPress={() => searchData()}>
          <FontAwesomeIcon
            icon={faSearch}
            size={windowWitdh * 0.08}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>
      <SafeAreaView style={styles.container}>
        <OptimizedFlatList
          // ListHeaderComponent={<Text>Hallo</Text>}
          keyExtractor={(item, index) => index.toString()}
          data={props.user}
          // contentContainerStyle={{alignItems: 'center'}}
          renderItem={renderItem}
          ListFooterComponent={loading ? <Loading /> : null}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={1}
          onRefresh={onRefresh}
          refreshing={refreshing}
          extraData={props.user}
        />
      </SafeAreaView>
    </View>
  );
};

export default ListType1;
const windowWitdh = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  userImg: {
    marginLeft: windowWitdh * 0.04,
    marginRight: windowWitdh * 0.06,
    width: windowWitdh * 0.15,
    height: windowWitdh * 0.15,
    borderRadius: (windowWitdh * 0.15) / 2,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flexDirection: 'row',
    paddingVertical: windowHeight * 0.01,
  },
  search: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  btnSearch: {
    padding: windowWitdh * 0.05,
    marginLeft: windowWitdh * 0.02,
    marginTop: windowHeight * 0.004,
    width: windowWitdh * 0.09,
    height: windowWitdh * 0.09,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.warning,
  },

  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
});
