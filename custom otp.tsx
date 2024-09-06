import {
    View,
    Text,
    TextStyle,
    KeyboardTypeOptions,
    TextInputProps,
    TextInput,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/hooks';
import { s, vs } from 'react-native-size-matters/extend';
// import { TextInput, TextInputProps } from 'react-native-paper';
interface Props extends TextInputProps {
    // title: string;
    // value: string;
    // updateMasterState: (value: string) => void;
    keyboardType?: KeyboardTypeOptions;
    textInputStyles?: TextStyle;
    otherTextInputProps?: TextInputProps;
    isInvalid?: boolean;
    isValid?: boolean;
    isActive?: boolean;
    isWarning?: boolean;
    disabled?: boolean;
    placeHolderText?: string;
    onClick?: () => void;
}
const CustomOtp: React.FC<Props> = ({
    // title,
    // value,
    // updateMasterState,
    keyboardType,
    isInvalid = true,
    isValid = false,
    isWarning = false,
    disabled = false,
    placeHolderText,
}) => {
    const { Common, Images, Colors, Layout, Gutters,Fonts } = useTheme();
    const items = [1, 2, 3, 4, 5, 6];
    const inputRefs = useRef<(TextInput | null)[]>([]);

    const handleTextChange = (text: string, index: number) => {
        if (text.length === 1 && index < items.length - 1) {
            // Move forward to the next input field when a character is typed
            inputRefs.current[index + 1]?.focus();
        }
    };
    
    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && index > 0) {
            // Move back to the previous input field on Backspace
            inputRefs.current[index - 1]?.focus();
        }
    };
    const border_textColor=() => {
        if (isInvalid) return Colors.error;
        if (isValid) return Colors.success;
        if (isWarning) return Colors.warning;
        if (disabled) return Colors.disable;
        return Colors.primary;
    };

    return (
        <View
            style={[
                // Layout.row,
                Gutters.smallHPadding,
                Gutters.smallVPadding,
                // Layout.alignItemsCenter,Layout.justifyContentCenter,
            ]}>
            
           
            <View
                style={[
                    Layout.row,
                    Layout.alignItemsCenter,
                    Layout.justifyContentBetween,
                ]}>
                {items.map((item, index) => (
                    <View
                        key={index}
                        style={{
                            height: 68,
                            width: s(51.67),
                            borderWidth: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderColor: border_textColor()
                        }}>
                        <TextInput 
                            ref={ref => (inputRefs.current[index] = ref)}
                            maxLength={1}
                            keyboardType={'number-pad'}
                            placeholderTextColor={Colors.black}
                            placeholder={'-'}
                            style={[Fonts.textSmall,{
                                height: 40,
                                width: s(19.67),
                                color: border_textColor(),marginLeft:6
                            },]}
                            cursorColor={Colors.secondary_surface}
                            onChangeText={(text) => handleTextChange(text, index)} // Handle input change (forward navigation)
            onKeyPress={(e) => handleKeyPress(e, index)} // Handle backspace (backward navigation)
                        />
                    </View>
                ))}
            </View>
        </View>
    );
};

export default CustomOtp;