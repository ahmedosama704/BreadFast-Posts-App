import React, { FC } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

interface PropsType {
    loading: boolean;
}
const LoadMoreData: FC<PropsType> = (props) => (
    <View style={style.footerStyle}>
        {props.loading && <ActivityIndicator color="black" />}
    </View>
);
const style = StyleSheet.create({
    footerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: '100%',
    },
});
export default LoadMoreData;
