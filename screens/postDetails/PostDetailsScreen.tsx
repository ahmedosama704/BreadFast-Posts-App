import React, { FC, useState, useEffect } from 'react';
import {
    StyleSheet, View, FlatList,
} from 'react-native';

import axios from 'axios';
import PostData from '../../components/postData/PostData';
import LoadMoreData from '../../components/shared/LoadMoreData';
import CommentCard from '../../components/commentCard/CommentCard';
import { API_URL } from '../../components/shared/Constants';

interface PostDetailsType {
    route: any,
    data: PostDataType,
    avatar: string,
    navigation: any,
}
interface PostDataType {
    id: number;
    title: string;
    body: string;
    user_id: number;
}
interface CommentDataType {
    id: number;
    name: string;
    body: string;
}
const PostDetailsScreen: FC<PostDetailsType> = (props) => {
    const { data, avatar, name } = props.route.params;
    const [comments, setComments] = useState<CommentDataType[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [
        onMomentumScrollBegin,
        setOnMomentumScrollBegin,
    ] = useState(false);

    // Load more data
    const onEndReached = () => {
        if (!onMomentumScrollBegin) {
            setLoading(true);
            setPageNumber(pageNumber + 1);
            setOnMomentumScrollBegin(true);
        }
    };
    // Get Posts
    const getPosts = () => {
        axios.get(`${API_URL}posts/${data.id}/comments`).then((response) => {
            if (pageNumber === 1) {
                setComments(response.data);
            } else {
                setComments([...comments, ...response.data]);
                setLoading(false);
            }
        });
    };
    useEffect(() => {
        getPosts();
    }, [pageNumber]);

    // change Header Title
    useEffect(() => {
        const pageTitle: string = !!data.title && data.title.length > 30
            ? `${data.title.substr(0, 30)}...`
            : data.title;
        props.navigation.setOptions({
            title: pageTitle,
        });
    }, [data]);
    return (
        <View>
            <FlatList
                data={comments}
                renderItem={({ item, index }) => (
                    <CommentCard data={item} index={index} />
                )}
                keyExtractor={(item: any) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={style.flatListStyle}
                onEndReached={() => onEndReached()}
                onEndReachedThreshold={0.5}
                onMomentumScrollBegin={() => {
                    setOnMomentumScrollBegin(false);
                }}
                ListHeaderComponent={() => <PostData data={data} avatar={avatar} name={name} />}
                ListFooterComponent={<LoadMoreData loading={loading} />}
            />
        </View>
    );
};

const style = StyleSheet.create({
    flatListStyle: { paddingHorizontal: 20 },
});
export default PostDetailsScreen;
