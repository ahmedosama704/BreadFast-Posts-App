import React, { FC, useState, useEffect } from 'react';
import {
    StyleSheet, View, FlatList, ActivityIndicator, SafeAreaView, Text, StatusBar,
} from 'react-native';
import axios from 'axios';
import PostCard from '../../components/postCard/PostCard';
import LoadMoreData from '../../components/shared/LoadMoreData';
import { API_URL } from '../../components/shared/Constants';

interface Posts {
    id: number;
    title: string;
    body: string;
    user_id: number;
}

const HomeScreen: FC = () => {
    const [data, setData] = useState<Posts[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
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
        setLoading(true);
        axios.get(`${API_URL}posts?page=${pageNumber}&per_page=5`).then((response) => {
            if (pageNumber === 1) {
                setData(response.data);
                setLoading(false);
            } else {
                setData([...data, ...response.data]);
                setLoading(false);
            }
        }).catch((err) => {
            setErrorMessage(err.data.message);
            setLoading(false);
        });
    };
    // Update Posts when page number change
    useEffect(() => {
        getPosts();
    }, [pageNumber]);

    // Page loader
    const PageLoader = () => (
        <View style={style.loader}>
            <ActivityIndicator color="black" />
            {errorMessage.length > 0 && (
                <Text>
                    {errorMessage}
                </Text>
            )}
        </View>
    );

    return (
        <SafeAreaView style={style.container}>
            <StatusBar
                animated
                backgroundColor="#fff"
                showHideTransition="fade"
                barStyle="dark-content"
            />
            {loading && !!data && data.length === 0 ? (
                <PageLoader />
            ) : (
                <FlatList
                    data={data}
                    renderItem={
                        ({ item }) => (
                            <PostCard data={item} />
                        )
                    }
                    keyExtractor={(item: any) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={style.flatListStyle}
                    onEndReached={() => onEndReached()}
                    onEndReachedThreshold={0.5}
                    onMomentumScrollBegin={() => {
                        setOnMomentumScrollBegin(false);
                    }}
                    ListFooterComponent={<LoadMoreData loading={loading} />}
                />
            )}
        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    flatListStyle: { paddingHorizontal: 20 },
});
export default HomeScreen;
