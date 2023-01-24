import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, ImageBackground, StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useMemo, useState } from 'react';
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, Ionicons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';


import { HomeNavigationParamList } from "../../types/stackScreen.types";
import { useImageColor } from "../../hooks/useImageColor";
import { firstCharToUpper } from "../../utils/helper";
import { HStack, VStack } from "native-base";
import { useQuery } from "@tanstack/react-query";
import { getArtist } from "../../api/ArtistsAPI";


export const DetailsScreen = ({ navigation, route }: 
    NativeStackScreenProps<HomeNavigationParamList, 'Details'>
) => {
    const { name, artists, images, release_date, release_date_precision, album_type } = route.params;
    const contentImage = images[0];
    const release_year = release_date.split('-')[0];
    const mainArtist = artists[0];

    const insets = useSafeAreaInsets();
    const [ isFavorite, setIsFavorite ] = useState(false);

    const { data, isLoading, error} = useQuery({
        queryKey: [`${mainArtist.name}-image`],
        queryFn: () => getArtist(mainArtist.id),
        cacheTime: 60000
    })

    return (
        <SafeAreaView 
            style={styles.container} 
            edges={['right', 'bottom', 'left']} 
        >
           
            <LinearGradient
                colors={['orange', '#121212']}
                locations={[0, 0.55]}
                style={[styles.gradient_container, { paddingTop: insets.top + 20 }]}
            >
                <ScrollView>
                    <View style={styles.imageContainer}>
                        <Feather name="chevron-left" size={30} color="#fff" style={{ flex: 0.1, top: -5 }} />

                        {/* USE FALLBACK IMAGE IF IMAGE HASNT LOADED */}
                        <View 
                            style={{ 
                                alignItems: 'center', 
                                flex: 0.8, 
                                shadowColor: '#121212', 
                                shadowOpacity: 1, 
                                shadowOffset: { width: 0, height: 8}, 
                                shadowRadius: 10,
                                marginBottom: 20
                            }}
                        >
                            <Image 
                                source={{ uri: contentImage.url }} 
                                style={{
                                    width: 260,
                                    height: 260,
                                }}
                            />
                        </View>
                    </View>
                    
                    <View style={{ paddingHorizontal: 10}}>
                        <VStack  space={1.5}>
                            <Text style={{ fontSize: 24, fontWeight: "bold", color: '#fff'}}>{name}</Text>
                            
                            <HStack alignItems='center' style={{ alignSelf: 'flex-start'}} space={2}>
                                { data && <Image source={{ uri: data?.images[0].url }}  style={{ width: 20, height: 20, borderRadius: 30 }}/> }

                                <Text style={{ fontSize: 12, fontWeight: "bold", color: '#fff'}}>{mainArtist.name}</Text>
                            </HStack>

                            <Text style={{ fontSize: 12, fontWeight: '500', color: '#fff', opacity: .6 }}>
                                {firstCharToUpper(album_type)}{' '}

                                <View >
                                    <Text style={{ color: '#fff', opacity: .6, fontSize: 5 }}>{'\u2B24'}</Text>
                                </View>

                                <Text>{' '}{release_year}</Text>
                            </Text>
                        </VStack>

                        <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', justifyContent: 'space-between' }}>
                            <HStack space="1.5">
                                <Pressable onPress={() => setIsFavorite((prev) => !prev)}>
                                    {!isFavorite ? (
                                        <MaterialIcons 
                                            name="favorite-outline" 
                                            size={24} 
                                            style={styles.inactiveIcon} 
                                        />
                                    ): (
                                        <MaterialIcons 
                                            name="favorite" 
                                            size={24} 
                                            color='#57B65F'
                                        />
                                    )}
                                </Pressable>

                                <Pressable onPress={() => console.log("pressed options")}>
                                    <SimpleLineIcons name="options" size={22} style={styles.inactiveIcon} />
                                </Pressable>
                            </HStack>

                            <HStack alignItems="center" space={2}>
                                <Ionicons name="ios-shuffle-outline" size={24} color="#57B65F" />

                                <Ionicons name="play-circle-sharp" size={44} color="#57B65F" />
                            </HStack>
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    bg_image: {
        flex: 1
    },
    container: {
        flex: 1
    },
    gradient_container: {
        flex: 1
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        // backgroundColor: 'red', 
        alignItems: 'flex-start'
    },
    inactiveIcon: {
        color: '#fff',
        opacity: 0.6
    }
})