import { useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function ScanScreen() {
  const cameraRef = useRef<CameraView | null>(null);

  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (!permission) return;
    if (!permission.granted) requestPermission();
  }, [permission]);

  if (!permission) return <View style={styles.container}/>;

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <View style={styles.permissionBox}>
          <Text style={styles.permissionText}>Camera permission is required. Please go to your device's settings to allow access.</Text>
          <TouchableOpacity style={[styles.permissionButton]} onPress={() => Linking.openSettings()}>
            <Text style={styles.permissionButtonText}>Open Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={StyleSheet.absoluteFillObject} facing="back"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24, 
    backgroundColor: 'rgba(0,0,0,0.6)'
  },

  permissionBox: { 
    backgroundColor: '#222', 
    padding: 20, 
    paddingBottom: 27,
    borderRadius: 15, 
    alignItems: 'center'
  },

  permissionText: {
    fontSize: 17,
    textAlign: 'center',
    paddingHorizontal: 15,
    color: '#fff'
  },

  permissionButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    paddingBottom: 12,
    marginTop: 15,
    borderRadius: 11,
    backgroundColor: "#FF6B6B" 
  },

  permissionButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 19
  }
});