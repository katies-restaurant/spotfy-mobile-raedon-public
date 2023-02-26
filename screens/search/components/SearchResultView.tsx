import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { Dispatch, PropsWithoutRef, useEffect, useState } from "react";

import { AppLoader } from "../../../components";
import { AppPill } from "../../../components";
import { SearchResponse } from "../../../api/search/search.types";
import { AlbumSearchView } from "./AlbumSearchView";
import { isEmpty } from "../../../utils/helper";
import { ArtistSearchFilterView } from "./ArtistSearchFilterView";
import { TracksSearchResultView } from "./TracksSearchResultView";
import Animated, { SlideInDown, SlideInUp } from "react-native-reanimated";


type SearchResultViewProps = {
    data: SearchResponse;
    isLoading: boolean;
    error: any;
};

export const SearchResultView = ({ data, isLoading, error }: SearchResultViewProps) => {
    const [activeTag, setActiveTag] = useState<number>(0);

    const allData = {
        // top: { 
        //     albums: data.albums?.items, 
        //     artists: data.artists?.items, 
        //     tracks: data.tracks?.items
        // },
        artists: data.artists?.items,
        albums: data.albums?.items,
        tracks: data.tracks?.items
    }
    
    const tags = Object.keys(allData).map((t) => 
        (t.charAt(0).toLocaleUpperCase() + t.slice(1, t.length)) as keyof SearchResponse
    ); 


    return (
        <Animated.View 
            entering={SlideInDown.duration(400)}
            style={styles.container}
        >
            <ScrollView 
                horizontal
                contentContainerStyle={styles.pillsContainer}
            >
                {tags.map((tag, index) => (
                    <View key={index} style={{ marginHorizontal: 4}}>
                        <AppPill 
                            pillText={tag}
                            pillTextStyle={{
                                fontSize: 14,
                                fontWeight: '500',
                                color: activeTag === index ? "#000" : "#fff",
                            }}
                            containerStyle={{
                                backgroundColor: activeTag === index ? "#57B65F" : "#282828",
                                height: 30,
                                paddingHorizontal: 20,
                                borderRadius: 20, 
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                            onPress={() => setActiveTag(index)}
                        /> 
                    </View>
                ))}
            </ScrollView>

            {tags[activeTag].toLowerCase() === "albums" && (
                <AlbumSearchView albumData={allData["albums"] }/>
            )}

            {(tags[activeTag].toLowerCase() === "artists" && !isEmpty(allData["artists"])) && (
                <ArtistSearchFilterView artistData={allData["artists"]} />
            )}

            {(tags[activeTag].toLowerCase() === "tracks" && !isEmpty(allData["tracks"])) && (
                <TracksSearchResultView tracksData={allData["tracks"] }/>
            )}

        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    pillsContainer: {
        paddingVertical: 10,
        justifyContent: "space-around",
    }
})