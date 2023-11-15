import { StyleSheet, Text, TextProps, TextStyle, View } from 'react-native'
import React, { ReactNode } from 'react'

interface CustomTextProps extends TextProps {
  children: ReactNode;
}

const CustomTextComponent =  ({ children, style, ...restProps }: CustomTextProps) => {
  const textStyles: TextStyle = {
    color: '#000',
    ...(style as TextStyle), // Añadir estilos adicionales si se proporcionan
  };

  return (
    <Text style={textStyles} {...restProps}>
      {children}
    </Text>
  );
};

export default CustomTextComponent

const styles = StyleSheet.create({})