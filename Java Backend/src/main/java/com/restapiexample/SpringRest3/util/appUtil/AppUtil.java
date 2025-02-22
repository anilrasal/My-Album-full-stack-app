package com.restapiexample.SpringRest3.util.appUtil;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.imageio.ImageIO;

import java.awt.image.BufferedImage;

import org.imgscalr.Scalr;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.web.multipart.MultipartFile;

public class AppUtil {

    private static String PATH = "src\\main\\resources\\static\\uploads\\";

    public static boolean delete_photo_from_path(String fileName, String folderName, long album_id){
        try {
            File f = new File(PATH+album_id+"\\"+folderName+"\\"+fileName);
            if(f.delete()){
                return true;
            }else{
                return false;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

    }

    public static String get_photo_upload_path(String fileName, String folderName, long album_id) throws IOException {

        Files.createDirectories(Paths.get(PATH + album_id + "\\" + folderName));
        return new File(PATH + album_id + "\\" + folderName).getAbsolutePath() + "\\" + fileName;
    }

    public static BufferedImage getThumbnail(MultipartFile originalFile, Integer width) throws IOException {
        BufferedImage thumbImg = null;
        BufferedImage img = ImageIO.read(originalFile.getInputStream());
        thumbImg = Scalr.resize(img, Scalr.Method.AUTOMATIC, Scalr.Mode.AUTOMATIC, width, Scalr.OP_ANTIALIAS);
        return thumbImg;
    }

    public static Resource getFileAsResource(long album_id, String folder_name, String file_name) throws IOException {
        String location = PATH + album_id + "\\" + folder_name + "\\" + file_name;
        File file = new File(location);
        if(file.exists()){
            Path path = Paths.get(file.getAbsolutePath());
            return new UrlResource(path.toUri());
        }else{
            return null;
        }
    }

}
