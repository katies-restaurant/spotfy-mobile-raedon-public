import { FlatList, HStack } from "native-base";
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';

import { SearchArtists } from "../../../api/search/search.types";
import { ViewSeperator } from "../../../components/core/ViewSeperator";
import ArtistDefaultImage from "../../../assets/images/artistDefaultImage.jpg";


type Props = {
    artistData: SearchArtists['items']
}

const windowWidth = Dimensions.get("window").width;

export const ArtistSearchFilterView = ({artistData}: Props) => {
    console.log({ artistData })
    const handleNavigation = () => {
        // navigate
        // cache visited artiste under search
        console.log("navigate to artist screen")
    }

    return (
        <FlatList
            data={artistData}
            renderItem={({ item }) => (
                <Pressable 
                    onPress={handleNavigation}
                    style={styles.itemContainer}
                >
                    <HStack style={styles.profile} space={4}>
                        <Image 
                            defaultSource={ArtistDefaultImage}
                            source={{ uri: item.images[0] ? item.images[0].url : undefined }}
                            style={styles.image}
                        />  
                        <Text 
                            style={styles.text} 
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {item.name}
                        </Text>
                    </HStack>

                    <View style={styles.iconContainer}>
                        <AntDesign name="right" size={24} style={styles.caretIcon} />
                    </View>
                </Pressable>
            )}
            ItemSeparatorComponent={() => <ViewSeperator spacing={10} />}
        />
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    caretIcon: {
        color: "#fff",
        opacity: 0.6,
    },
    iconContainer: {
        width: windowWidth * (20/100),
        height: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    profile: {
        alignItems: "center",
        width: windowWidth * (80/100),
        overflow: "hidden"
    },
    image: {
        width: 56,
        height: 56,
        borderRadius: 28
    },
    text: {
        fontSize: 14,
        fontWeight: "600",
        color: "#fff"
    }
})