import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { FontAwesome } from "@expo/vector-icons";

const CameraScreen = ({ route, navigation }) => {
    const [cameraRef, setCameraRef] = useState(null);
    const { onPictureTaken } = route.params;

    const takePicture = async () => {
        if (cameraRef) {
            const options = { quality: 0.1, base64: true, skipProcessing: true };
            const data = await cameraRef.takePictureAsync(options);
            onPictureTaken(data);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Camera
                style={{ flex: 1 }}
                type={Camera.Constants.Type.front}
                ref={(ref) => setCameraRef(ref)}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "transparent",
                        justifyContent: "flex-end",
                        paddingBottom: 50,
                    }}
                >
                    <TouchableOpacity
                        style={{
                            alignSelf: "center",
                            alignItems: "center",
                            backgroundColor: "white",
                            borderRadius: 50,
                            height: 100,
                            marginBottom: 20,
                            width: 100,
                        }}
                        onPress={takePicture}
                    >
                        <FontAwesome
                            name="camera"
                            size={40}
                            color="black"
                            style={{ paddingTop: 30 }}
                        />
                    </TouchableOpacity >
                </View>
            </Camera>
        </View>
    );
};

export default CameraScreen;
