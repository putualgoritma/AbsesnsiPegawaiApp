import React,{ Component } from 'react';
import {
  View,
  Alert,
  StyleSheet,
  Text,
} from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
 class Tabel1 extends Component {
    constructor(props) {
      super(props);
      this.state = {
        tableHead: this.props.tbhead,
        tableData: this.props.tbdata
      }
    }
    _alertIndex(index) {
      Alert.alert(`This is row ${index + 1}`);
    }
   
    render() {
      const state = this.state;
      const element = (data, index) => (
        <View>
        </View>
      );
      return (
    <View style={{paddingTop:20}}>
      <View style={{width:'100%', backgroundColor:'#E5E5E5', height:2}}>
      </View>
        <View style={{padding:15}}>
        <Text style={{fontWeight:'bold', fontSize:15}}>{this.props.title}</Text>
        </View>
      <View style={{width:'100%', backgroundColor:'#E5E5E5', height:2}}>
      </View>
      <View style={styles.containertable}>
          <Table borderStyle={{borderWidth: 0}}>
              <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
              {
              state.tableData.map((rowData, index) => (
                  <TableWrapper key={index} style={styles.row}>
                  {
                      rowData.map((cellData, cellIndex) => (
                      <Cell key={cellIndex} data={cellIndex === this.props.cellindex ? element(cellData, index) : cellData} textStyle={styles.text}/>
                      ))
                  }
                  </TableWrapper>
              ))
              }
          </Table>
        </View>
    </View>
      )
    }
  }
  const styles = StyleSheet.create({
    containertable: { 
      flex: 1, 
      padding: 10, 
      paddingTop: 3, 
      backgroundColor: '#FFFFFF' 
    },
    head: { 
      height: 50, 
      backgroundColor: '#FFFFFF' 
    },
    text: { 
      margin: 6
    },
    row: { 
      flexDirection: 'row', 
      backgroundColor: '#ffffff',  
    },
  });
  export default Tabel1