package org.looom;

import java.util.Arrays;

public class a {
    public void b(Object... result) {
        System.out.println("result的长度: " + result.length);
        System.out.println("直接打印result: ");
        System.out.println(result);
        System.out.println("遍历result: ");
        for (Object o : result) {
            System.out.print(o + " ");
        }
        System.out.println("Arrays拷贝result: ");
        Object[] copy = Arrays.copyOf(result, result.length);
        System.out.println(copy);
        System.out.println("Arrays.copyOf后的长度: "+ copy.length);
        System.out.println("Arrays.asList(result): ");
        System.out.println(Arrays.asList(copy));
    }
}
