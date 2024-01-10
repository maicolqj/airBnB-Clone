import { StyleSheet, Text, TextProps, TextStyle, View } from 'react-native'
import React, { ReactNode } from 'react'
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from 'react-native-responsive-screen';



interface CustomTextProps extends TextProps {
  children: ReactNode;
}

const CustomText =  ({ children, style, ...restProps }: CustomTextProps) => {
  const textStyles: TextStyle = {
    fontSize:hp(1.8),
    color: '#000',
    ...(style as TextStyle), 
  };

  return (
    <Text style={textStyles} {...restProps}>
      {children}
    </Text>
  );
};

export default CustomText

const styles = StyleSheet.create({})