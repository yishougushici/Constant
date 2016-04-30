package tools;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.Scanner;

public class Tools{
    /**
     * 判断时间是否合法
     * @param poetry 待判断诗句
     * @return 返回 1 表示诗句合法
     * 其他返回值:
     * -1: 请求出错---诗句无效
     * 0: 请求道网页但是没有符合条件结果---至今没有测试到
     * 1: 成功
     * 2: 请求到的结果包含关键字  --- 比如输入"呵呵"
     *
     */
    public static int isValidPoetry(String poetry){
        String urlStr = "http://www.shicimingju.com/chaxun/shiju/"+poetry;
        try {
            URL url = new URL(urlStr);
            //发送请求
            URLConnection urlConnection = url.openConnection();
            InputStream inputStream = urlConnection.getInputStream();
            //读取内容
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));

            String line;
            int recode = 0;

            while ((line = bufferedReader.readLine()) != null) {
                if (line.contains("、<em>"+poetry+"</em></li>")){
                    System.out.println(line);
                    return 1;
                }

                else if(line.contains("<em>"+poetry+"</em>")){
                    System.out.println(line);
                    recode=2;
                }
            }
            return recode;
        }
        catch(Exception e){
            e.printStackTrace();
            return -1;
        }
    }

    public static void main(String[] args){
        Scanner in = new Scanner(System.in);
        while(in.hasNext()){
            String test = in.next();
            switch (isValidPoetry(test)){
                case -1:
                    System.out.println("请求出错");break;
                case 0:
                    System.out.println("无效诗句");break;
                case 1:
                    System.out.println("有效诗句");break;
                case 2:
                    System.out.println("不是完整诗句");break;
            }
        }
    }
}