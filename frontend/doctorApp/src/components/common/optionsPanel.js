import {ActivityIndicator, View, Text, TouchableOpacity} from 'react-native';
import {SwipeablePanel} from 'rn-swipeable-panel';
import {dark1, fontMedium} from '../../globalStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircle, faCircleDot} from '@fortawesome/free-regular-svg-icons';
import {useState} from 'react';
import ActionButton from './actionButton';

const OptionsPanel = ({
  isPanelActive,
  setIsPanelActive,
  options,
  selectedItem,
  handlePress,
  loading,
}) => {
  const [selected, setSelected] = useState(selectedItem);
  return (
    <SwipeablePanel
      isActive={isPanelActive}
      fullWidth={true}
      noBackgroundOpacity={true}
      closeOnTouchOutside={true}
      showCloseButton={true}
      closeIconStyle={{backgroundColor: '#000000'}}
      onlyLarge
      onClose={() => {
        setIsPanelActive(false);
      }}>
      <View style={{paddingVertical: 15, paddingHorizontal: 10}}>
        <View
          style={{
            maxWidth: 250,
            width: '100%',
            alignSelf: 'center',
          }}>
          {options.map(e => {
            return (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 5,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: '#00000033',
                  padding: 10,
                }}
                onPress={() => {
                  setSelected(e);
                }}>
                <FontAwesomeIcon
                  icon={e === selected ? faCircleDot : faCircle}
                  color={dark1}
                  size={24}
                />
                <Text
                  style={{
                    ...fontMedium,
                    fontSize: 16,
                    color: '#000000',
                    flex: 1,
                    textAlign: 'center',
                  }}>
                  {e}
                </Text>
              </TouchableOpacity>
            );
          })}

          <View style={{marginTop: 8}}>
            <ActionButton
              label="Submit"
              loading={loading}
              handlePress={() => {
                handlePress(selected);
              }}
            />
          </View>
        </View>
      </View>
    </SwipeablePanel>
  );
};

export default OptionsPanel;
