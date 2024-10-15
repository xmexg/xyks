package com.soleil.xyks;

import com.github.unidbg.AndroidEmulator;
import com.github.unidbg.Module;
import com.github.unidbg.linux.android.AndroidEmulatorBuilder;
import com.github.unidbg.linux.android.AndroidResolver;
import com.github.unidbg.linux.android.dvm.*;
import com.github.unidbg.linux.android.dvm.array.ByteArray;
import com.github.unidbg.memory.Memory;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.Base64;
import java.util.zip.GZIPInputStream;

public class XyDex extends AbstractJni {
    private final AndroidEmulator emulator;
    private final VM vm;
    private final Module module;

    public DvmClass EClass;
    public String apkPath = "unidbg-android/src/test/resources/apks/xiaoyuan/xxx.apk";

    XyDex() {
        emulator = AndroidEmulatorBuilder.for64Bit().build();
        final Memory memory = emulator.getMemory();
        memory.setLibraryResolver(new AndroidResolver(23));
        vm = emulator.createDalvikVM(new File(apkPath));
        vm.setVerbose(true);
        DalvikModule dm = vm.loadLibrary(new File("unidbg-android/src/test/resources/apks/xiaoyuan/libContentEncoder.so"), true);

        vm.setJni(this);
        module = dm.getModule();
        dm.callJNI_OnLoad(emulator);

        EClass = vm.resolveClass("com/fenbi/android/leo/imgsearch/sdk/utils/e");
    }

    public void decrypt(){
        String methodId = "c([B)[B";
        byte[] data = {-53,-78,-87,-73,41,-32,-92,107,-96,26,-89,50,-112,111,-2,-8,-122,72,-103,5,-101,22,77,-76,-70,-2,-74,49,-77,29,-31,68,72,-45,-121,-46,117,58,-13,-75,35,-28,-106,116,-47,49,-120,117,-77,34,-89,-6,27,31,-107,-102,-112,-13,-100,73,-83,-13,-67,92,-120,-38,71,30,102,11,56,-92,-43,-64,82,-49,101,118,38,-81,102,-34,25,-50,-24,1,117,102,-127,7,13,-121,-9,-46,-119,67,-24,67,-124,-30,33,-2,-45,34,76,26,-85,-37,89,-71,49,94,-40,71,101,71,-124,-33,-116,-82,-33,-120,-109,-20,-42,-67,-125,127,55,119,-125,103,42,61,-108,90,-125,-91,58,-115,39,-124,-95,119,46,-118,-10,-120,-63,121,57,105,-25,-99,77,50,-124,-112,98,126,-90,9,-29,90,-74,29,116,92,33,-121,0,56,-75,-46,-53,-99,-76,-37,16,-30,40,-45,-22,36,-18,-107,33,-14,-116,-32,-67,-111,99,-118,-5,80,60,-121,51,101,33,63,-21,48,54,-119,107,112,109,-90,56,-6,-30,-43,-110,-120,48,-101,-41,66,3,119,-46,42,69,87,9,59,36,64,-1,55,78,-26,-26,-82,-3,6,-49,118,-81,45,19,-86,-71,-100,56,-107,-20,-52,-84,32,96,71,6,-65,108,25,88,-117,-31,52,79,-6,14,-30,-99,71,6,105,-65,54,39,111,-38,116,-17,36,-77,114,-74,-15,9,-97,-88,-97,51,-117,108,-91,-65,-121,-62,49,81,75,7,-13,53,100,60,-83,-12,-55,-9,33,41,51,-102,-57,-71,-120,-47,39,33,-23,12,77,28,43,113,34,-21,74,-84,-101,93,32,98,-36,34,58,-33,86,-52,27,-44,6,-71,-33,65,-44,33,29,-88,-85,78,-105,122,43,14,91,-109,9,-14,-97,-51,31,-21,6,-80,126,65,-55,90,29,-41,-69,-56,-2,117,68,120,-29,119,-114,-5,-58,-65,-41,-59,-19,-97,34,-126,97,-11,85,69,101,3,-91,63,7,-42,-54,0,118,15,-43,123,41,-44,-52,77,7,48,93,101,-127,16,-48,17,62,-51,6,-2,-53,29,-2,50,87,11,-33,94,-38,-17,99,59,-44,26,-93,-50,58,-118,84,38,-106,-86,116,97,73,-111,-86,-104,0,23,94,114,100,67,86,13,-2,-104,-119,-113,-128,39,98,-18,-59,-36,-40,84,54,19,43,103,-117,-45,24,39,29,117,31,-46,121,51,37,-84,110,97,116,123,-45,-121,-7,-120,-3,97,-12,6,118,3,-10,-37,-74,13,107,-56,-49,18,-69,-12,118,32,108,-85,79,-37,-108,-81,-112,-105,42,68,-64,17,-69,63,80,73,-22,3,-42,-111,-6,55,-67,-2,37,-119,-83,61,103,125,13,10,-76,-40,-3,67,-17,12,-58,-45,20,-117,-18,-112,-83,-10,-47,3,87,-21,70,50,-76,-86,-51,-58,60,115,80,59,41,-70,-65,-45,22,-107,-94,91,-85,12,-104,-30,88,102,-121,-27,82,110,15,97,121,-9,36,74,-40,-43,112,62,28,21,87,87,59,-97,121,-80,-67,-34,11,60,71,-121,47,-67,-85,-87,-77,-28,-2,-106,-100,3,113,24,54,-119,-14,-39,-65,18,126,70,-96,-39,65,58,84,110,-30,-107,-6,35,-120,6,87,31,-44,-90,-56,103,70,27,-22,-35,-47,-94,68,45,49,-94,99,-43,-98,-71,-36,27,-81,-44,-101,-115,22,36,38,62,-15,-2,-64,68,-119,-98,-67,-87,-93,-12,1,44,-126,-87,109,-58,117,37,-81,16,110,-105,105,-35,98,1,77,-3,37,-1,-61,-27,-116,108,89,-17,-58,19,-41,-45,65,-60,-115,-126,-77,126,85,-57,95,127,108,90,105,-123,-44,-35,40,-117,77,92,124,59,47,-106,-76,75,17,16,-3,74,-101,8,114,114,-30,39,47,-13,17,-59,41,20,70,26,-49,-112,104,71,-110,-116,-20,-30,-52,106,102,79,-86,-46,-77,-59,-102,5,47,-22,5,-125,-107,22,69,22,52,-25,51,48,-107,-51,111,-89,101,79,-105,-85,113,-29,83,22,64,4,53,42,122,-94,-74,66,95,108,67,110,31,94,-11,76,57,-51,-127,107,-96,93,-79,10,-100,15,-84,-93,2,108,90,119,11,101,106,-92,112,-111,13,45,-113,-56,-113,104,33,-65,-53,68,8,61,84,-80,-38,-119,-114,76,17,53,-75,38,-108,53,-24,108,34,-5,37,-78,-42,41,-15,32,28,-30,-8,-86,-86,105,125,-55,18,-74,8,68,27,-56,-73,-81,-97,112,-104,-97,-66,-39,27,39,75,-93,33,37,120,-112,-35,-88,-50,-7,-17,-120,-5,93,25,-56,-91,73,-101,-103,43,7,-19,-84,91,-20,64,-89,64,-27,103,-82,-73,104,-80,88,72,26,-8,-117,59,94,69,-5,-128,-95,47,-116,-92,-55,42,-25,25,13,-119,-125,64,98,84,55,-12,-82,47,25,48,-34,26,124,56,25,71,127,2,7,27,53,110,5,115,121,32,97,2,-29,3,54,92,8,119,-17,61,70,40,83,-57,29,-108,23,-124,-67,-47,-48,100,121,96,-31,121,61,-55,120,24,0,13,15,-34,38,119,57,-31,-73,91,34,1,111,53,46,-79,64,103,24,35,-119,-54,-125,-113,14,14,50,114,-128,80,1,87,-110,10,117,24,-107,30,-5,89,-31,-45,79,-31,26,-107,-5,15,-38,18,-107,-65,7,-35,-44,38,67,-2,109,-25,-55,-34,102,94,-81,-93,-21,55,63,-74,115,-117,-56,63,112,88,34,13,-123,32,68,-10,-90,-112,90,-72,-98,33};
        DvmObject<?> res = EClass.callStaticJniMethodObject(
                emulator, methodId,
                new ByteArray(vm, data));
        ByteArray result = (ByteArray) res;

        System.out.println(Arrays.toString(result.getValue()));

        // 打印字节数组
        System.out.println("Byte Array: " + Arrays.toString(result.getValue()));

        // 将字节数组转换为 Base64 编码
        String base64Encoded = Base64.getEncoder().encodeToString(result.getValue());
        System.out.println("Base64 Encoded: " + base64Encoded);

        // 将 Base64 编码的字符串解码回字节数组
        byte[] decodedBytes = Base64.getDecoder().decode(base64Encoded);

        // 使用 GZIP 解压
        byte[] decompressedBytes = decompress(decodedBytes);

        // 将解压后的字节数组转换为字符串
        String decompressedString = new String(decompressedBytes);

        // 输出解压后的字符串
        System.out.println("Decompressed String: " + decompressedString);
    }

    public static byte[] decompress(byte[] input)  {
        try (ByteArrayInputStream bais = new ByteArrayInputStream(input);
             GZIPInputStream gis = new GZIPInputStream(bais);
             ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            byte[] buffer = new byte[1024];
            int length;
            while ((length = gis.read(buffer)) > 0) {
                baos.write(buffer, 0, length);
            }
            return baos.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }


        // 将字节数组转换为 Base64 编码
//        String base64Encoded = Base64.getEncoder().encodeToString(result.getValue());
        // 输出 Base64 编码结果
//        System.out.println(new String(base64Encoded.getBytes(StandardCharsets.UTF_8), StandardCharsets.UTF_8));


/*        // 将字节数组转换为十六进制字符串
        String hexString = bytesToHex(result.getValue());
        // 输出十六进制字符串
        System.out.println(hexString);*/


/*        // 将字节数组转换为 UTF-8 编码的字符串
        String utf8String = new String(result.getValue(), StandardCharsets.UTF_8);
        // 输出 UTF-8 编码的字符串
        System.out.println(utf8String);*/

    }




    public static String bytesToHex(byte[] bytes) {
        StringBuilder hexString = new StringBuilder();
        for (byte b : bytes) {
            String hex = Integer.toHexString(0xFF & b);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }

    public static void main(String[] args) {
        XyDex xiaodec = new XyDex();
        xiaodec.decrypt();
    }
}
