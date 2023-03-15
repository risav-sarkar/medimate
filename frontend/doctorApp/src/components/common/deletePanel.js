import {ActivityIndicator, View, Text, TouchableOpacity} from 'react-native';
import {SwipeablePanel} from 'rn-swipeable-panel';
import {fontBold, fontSemiBold} from '../../globalStyle';

const DeletePanel = ({
  isPanelActive,
  setIsPanelActive,
  label,
  handlePress,
  loading,
}) => {
  return (
    <SwipeablePanel
      isActive={isPanelActive}
      fullWidth={true}
      noBackgroundOpacity={true}
      closeOnTouchOutside={true}
      showCloseButton={true}
      closeIconStyle={{backgroundColor: '#000000'}}
      onClose={() => {
        setIsPanelActive(false);
      }}>
      <View style={{paddingVertical: 15}}>
        <Text style={{...fontSemiBold, fontSize: 16, textAlign: 'center'}}>
          Are you sure you want to delete?
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: '#ff6a6a',
            maxWidth: 240,
            marginHorizontal: 20,
            alignSelf: 'center',
            padding: 12,
            borderRadius: 15,
            alignItems: 'center',
            width: '100%',
            marginTop: 15,
          }}
          onPress={() => {
            handlePress();
          }}>
          {loading ? (
            <ActivityIndicator color={'#fff'} />
          ) : (
            <Text style={{...fontBold, fontSize: 18, color: '#fff'}}>
              {label}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SwipeablePanel>
  );
};

export default DeletePanel;
