import React, { FC } from 'react';
import {
    Text, View, StyleSheet, Image,
} from 'react-native';
import VariablesStyle from '../../styles/Variables.Style';

interface PostDataType {
    data: PostType;
    avatar: string | any,
    name: string
}
interface PostType {
    title: string;
    body: string;
    user_id: number;
}

const PostData: FC<PostDataType> = (props) => {
    const { data, avatar, name } = props;
    return (
        <View style={style.cardContainer}>

            <View style={style.cardData}>
                <Text style={style.title}>
                    {data.title}
                </Text>
                <View style={style.row}>
                    <Image style={style.image} source={avatar} />
                    <Text style={style.userName}>{name}</Text>
                </View>
                <Text style={style.body}>{data.body}</Text>
            </View>
        </View>
    );
};
const style = StyleSheet.create({
    cardContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginVertical: 10,
    },
    row: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingBottom: 10,
        marginBottom: 10,
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 30,
        marginRight: 20,
    },
    userName: {
        fontFamily: VariablesStyle.fontBold,
        fontSize: 14,
        color: VariablesStyle.primary,
    },
    cardData: {
        padding: 10,
    },
    title: {
        fontFamily: VariablesStyle.fontBold,
        color: VariablesStyle.blackColor,
        fontSize: 16,
        marginBottom: 10,
    },
    body: {
        fontFamily: VariablesStyle.fontRegular,
        color: VariablesStyle.grayColor,
        fontSize: 16,
    },
});
export default PostData;
