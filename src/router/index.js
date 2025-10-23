import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../page/home';
import Test1 from '../Test1';
import AbsenceOut from '../page/requests/AbsenceOut';
import FileApprove from '../page/history/FileApprove';
import Absence from '../page/absence';
import AbsenceCreate from '../page/absence/absenceCreate';
import AbsenceCreateExtra from '../page/absence/AbsenceCreateExtra';
import AbsenceCreateExtraOff from '../page/absence/AbsenceCreateExtraOff';
import AbsenceCreateDuty from '../page/absence/AbsenceCreateDuty';
import AbsenceOff from '../page/absence/AbsenceOff';
import AbsenceEnd from '../page/absence/AbsenceEnd';
import AbsenceOffEnd from '../page/absence/AbsenceOffEnd';
import AbsenceExtraOff from '../page/absence/AbsenceExtraOff';
import AbsenceExtra from '../page/absence/AbsenceExtra';
import ListFile from '../page/history/ListFile';
import Check_Staff from '../page/check_staff';
import HistoryExtra from '../page/history/HistoryExtra';

import Leave from '../page/requests/Leave';
import Schedule from '../page/schedule';
import ScheduleShift from '../page/schedule/ShiftSchedule';
import AbsenceCreateOff from '../page/absence/absenceCreateOff';

import Request from '../page/requests';

import RDuty from '../page/requests/Duty';
import RDutyOut from '../page/requests/DutyOut';
import ROvertime from '../page/requests/Overtime';
import RPermit from '../page/requests/Permit';

import History from '../page/history';
import Report from '../page/history/Reports';
import HistoryRequest from '../page/history/HistoryRequests';
import Shift from '../page/shift';
import ChangeShift from '../page/shift/ChangeShift';

import changeShiftProposal from '../page/history/ChangeShiftProposal';
import changeShift from '../page/history/ChangeShift';

import message from '../page/Message';
import Holiday from '../page/Holiday';

import ShiftStaff from '../page/shift/ShiftStaff';
import Login from '../page/login/Login';
import SplashScreen from '../page/SplashScreen';
import Permission from '../page/requests/Permission';
import User from '../page/user';
import HistoryCShift from '../page/shift/History';
import CamDect from '../page/absence/CamDect';
import ListAbsence from '../page/absence/ListAbsence';
import ListHistory from '../page/history/ListHistory';
import EndSick from '../page/absence/EndSick';
import Forget from '../page/requests/Forget';
import Location from '../page/requests/Location';
import AdditionalTime from '../page/requests/AdditionalTime';

import VisitEtc from '../page/VisitEtc';
import Dispense from '../page/requests/Dispense';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="VisitEtc"
        component={VisitEtc}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="CamDect"
        component={CamDect}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Location"
        component={Location}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Titik Lokasi',
        }}
      />

      <Stack.Screen
        name="AdditionalTime"
        component={AdditionalTime}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Tambahan Jam kerja',
        }}
      />

      <Stack.Screen
        name="Forget"
        component={Forget}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Lupa Absen',
        }}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="User"
        component={User}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ListAbsence"
        component={ListAbsence}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'List Absen',
        }}
      />

      <Stack.Screen
        name="ListHistory"
        component={ListHistory}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'List Histori',
        }}
      />

      <Stack.Screen
        name="ListFile"
        component={ListFile}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'List File',
        }}
      />

      <Stack.Screen
        name="Check_Staff"
        component={Check_Staff}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Absen',
        }}
      />

      <Stack.Screen
        name="Absence"
        component={Absence}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Absen',
        }}
      />

      <Stack.Screen
        name="Leave"
        component={Leave}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Cuti',
        }}
      />

      <Stack.Screen
        name="Schedule"
        component={Schedule}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Jadwal',
        }}
      />

      <Stack.Screen
        name="message"
        component={message}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Pesan',
        }}
      />

      <Stack.Screen
        name="Holiday"
        component={Holiday}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Hari Libur',
        }}
      />

      <Stack.Screen
        name="ScheduleShift"
        component={ScheduleShift}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Jadwal',
        }}
      />

      <Stack.Screen
        name="AbsenceEnd"
        component={AbsenceEnd}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Absen',
        }}
      />

      <Stack.Screen
        name="AbsenceOffEnd"
        component={AbsenceOffEnd}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Absen',
        }}
      />

      <Stack.Screen
        name="AbsenceCreate"
        component={AbsenceCreate}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Absen',
        }}
      />

      <Stack.Screen
        name="AbsenceCreateOff"
        component={AbsenceCreateOff}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Absen',
        }}
      />

      <Stack.Screen
        name="AbsenceCreateExtra"
        component={AbsenceCreateExtra}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Absen',
        }}
      />

      <Stack.Screen
        name="AbsenceCreateExtraOff"
        component={AbsenceCreateExtraOff}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Absen',
        }}
      />

      <Stack.Screen
        name="AbsenceCreateDuty"
        component={AbsenceCreateDuty}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Absen',
        }}
      />

      <Stack.Screen
        name="AbsenceOff"
        component={AbsenceOff}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Absen',
        }}
      />

      <Stack.Screen
        name="AbsenceExtraOff"
        component={AbsenceExtraOff}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Absen',
        }}
      />

      <Stack.Screen
        name="AbsenceExtra"
        component={AbsenceExtra}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Absen',
        }}
      />

      <Stack.Screen
        name="AbsenceOut"
        component={AbsenceOut}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Absen Diluar',
        }}
      />
      <Stack.Screen
        name="RDuty"
        component={RDuty}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Dinas Dalam Kota',
        }}
      />

      <Stack.Screen
        name="RDutyOut"
        component={RDutyOut}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Dinas Keluar',
        }}
      />

      <Stack.Screen
        name="ROvertime"
        component={ROvertime}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Lembur',
        }}
      />

      <Stack.Screen
        name="RPermit"
        component={RPermit}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Permisi',
        }}
      />

      <Stack.Screen
        name="FileApprove"
        component={FileApprove}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Permisi',
        }}
      />

      <Stack.Screen
        name="Request"
        component={Request}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Pilih Menu',
        }}
      />

      <Stack.Screen
        name="EndSick"
        component={EndSick}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Tambah Tanggal Sakit',
        }}
      />

      <Stack.Screen
        name="Test1"
        component={Test1}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Absen',
        }}
      />

      <Stack.Screen
        name="History"
        component={History}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Histori Absen',
        }}
      />

      <Stack.Screen
        name="Report"
        component={Report}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Report',
        }}
      />

      <Stack.Screen
        name="HistoryExtra"
        component={HistoryExtra}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Histori Lembur',
        }}
      />

      <Stack.Screen
        name="HistoryRequest"
        component={HistoryRequest}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'History Permohonan',
        }}
      />

      <Stack.Screen
        name="changeShiftProposal"
        component={changeShiftProposal}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'History Tukar Shift',
        }}
      />

      <Stack.Screen
        name="Shift"
        component={Shift}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Shift',
        }}
      />
      <Stack.Screen
        name="ChangeShift"
        component={ChangeShift}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Tukar Shift',
        }}
      />

      <Stack.Screen
        name="changeShift"
        component={changeShift}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Tukar Shift',
        }}
      />

      <Stack.Screen
        name="ShiftStaff"
        component={ShiftStaff}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Shift',
        }}
      />

      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Permission"
        component={Permission}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'History Permohonan',
        }}
      />

      <Stack.Screen
        name="HistoryCShift"
        component={HistoryCShift}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'History Pertukaran Shift',
        }}
      />
      <Stack.Screen
        name="Dispense"
        component={Dispense}
        options={{
          headerStyle: {
            backgroundColor: '#16D5FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Dispensasi',
        }}
      />
    </Stack.Navigator>
  );
};
export default Router;
