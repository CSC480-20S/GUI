import java.util.Scanner;

public class MathQuestionPattern {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int line = sc.nextInt();
		for (int i = 0; i < line; i++) {
			for (int j = 0; j < line; j++) {
				System.out.print("("+i+","+ j+ ")");
			}
		}
	}

}
