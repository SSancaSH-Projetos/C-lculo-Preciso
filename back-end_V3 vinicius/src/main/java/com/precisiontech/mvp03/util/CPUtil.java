package com.precisiontech.mvp03.util;

public class CPUtil {
    public static double arredondarPara3CasasDecimais(double valor) {
        return Math.round(valor * 1000.0) / 1000.0;
    }
}
