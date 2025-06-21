package com.kintai.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * パスワードのBCryptハッシュ生成ユーティリティクラス
 */
public class PasswordHashGenerator {

    // BCryptの強度（ログコスト）を指定。10〜12が一般的な設定
    private static final int STRENGTH = 10;

    // パスワードエンコーダーのインスタンス（スレッドセーフ）
    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(STRENGTH);

    /**
     * 平文パスワードをBCryptハッシュに変換する
     * @param plainPassword 平文パスワード
     * @return ハッシュ化されたパスワード文字列
     */
    public static String hashPassword(String plainPassword) {
        if (plainPassword == null || plainPassword.isEmpty()) {
            throw new IllegalArgumentException("パスワードは空にできません");
        }
        return encoder.encode(plainPassword);
    }

    /**
     * メインメソッド（単体実行用）
     * コマンドライン引数のパスワードをハッシュ化して表示する
     */
    public static void main(String[] args) {
        if (args.length != 1) {
            System.out.println("使い方: java PasswordHashGenerator <password>");
            System.exit(1);
        }
        String plainPassword = args[0];
        String hashed = hashPassword(plainPassword);
        System.out.println("平文パスワード: " + plainPassword);
        System.out.println("BCryptハッシュ: " + hashed);
    }
}

