import React, { FC, useState, useEffect } from 'react';
import {
  Text, View, StyleSheet, Image, TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import VariablesStyle from '../../styles/Variables.Style';
import { API_URL } from '../shared/Constants';

interface PostCardDataType {
  data: PostType;
}
interface PostType {
  id: number;
  title: string;
  body: string;
  user_id: number;
}

const PostCard: FC<PostCardDataType> = (props) => {
  const { data } = props;
  const [userName, setUserName] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const navigation: any = useNavigation();
  const avatar = gender === 'male' ? require('../../images/male_avatar.png') : require('../../images/female_avatar.png');
  useEffect(() => {
    axios.get(`${API_URL}users/${data.user_id}`).then((response) => {
      setUserName(response.data.name);
      setGender(response.data.gender);
    });
  }, []);

  const name = userName || `User : ${data.user_id}`;
  return (
    <View style={style.cardContainer}>
      <View style={style.row}>
        <View style={style.imageContainer}>
          <Image style={style.image} source={avatar} />
        </View>
        <View style={style.cardHeader}>
          <Text style={style.userName}>
            {name}
          </Text>
        </View>
      </View>

      <View style={style.cardData}>
        <TouchableOpacity
          onPress={() => navigation.navigate('PostDetails', { data, avatar, name })}
        >
          <Text style={style.title}>
            {data.title}
          </Text>
        </TouchableOpacity>
        <Text style={style.body}>
          {!!data.body && data.body.length > 120
            ? data.body.substr(0, 120)
            : data.body}
        </Text>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 10,
    borderRadius: VariablesStyle.borderRadius,
  },
  row: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#ccc',
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
  cardHeader: {
    padding: 10,
    width: '80%',
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
export default PostCard;
