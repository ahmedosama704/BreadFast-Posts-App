import React, { FC } from 'react';
import {
    Text, View, StyleSheet, Image,
} from 'react-native';
import VariablesStyle from '../../styles/Variables.Style';

interface CommentCardType {
    data: CommentDataType,
    index: number
}
interface CommentDataType {
    id: number;
    name: string;
    body: string;
}
const CommentCard: FC<CommentCardType> = (props) => {
    const { data, index } = props;
    const avatar = index % 2 === 0
        ? require('../../images/female_avatar.png')
        : require('../../images/male_avatar.png');
    return (
        <View style={style.cardContainer}>
            <View style={style.row}>
                <View style={style.imageContainer}>
                    <Image style={style.image} source={avatar} />
                </View>
                <View style={style.cardData}>
                    <Text style={style.userName}>
                        {data.name}
                    </Text>
                    <Text style={style.body}>{data.body}</Text>
                </View>
            </View>
        </View>
    );
};
const style = StyleSheet.create({
    cardContainer: {
        flex: 1,
        padding: 10,
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingBottom: 10,
    },
    imageContainer: {
        width: '20%',
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 20,
    },
    userName: {
        fontFamily: VariablesStyle.fontBold,
        fontSize: 22,
        color: VariablesStyle.primary,
    },
    cardData: {
        padding: 10,
        width: '80%',
    },
    body: {
        fontFamily: VariablesStyle.fontRegular,
        color: VariablesStyle.grayColor,
        fontSize: 16,
        marginTop: 10,
    },
});
export default CommentCard;
