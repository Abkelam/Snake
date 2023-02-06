import javafx.animation.AnimationTimer;
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.input.KeyCode;
import javafx.scene.layout.Pane;
import javafx.scene.paint.Color;
import javafx.scene.shape.Rectangle;
import javafx.stage.Stage;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class SnakeGame extends Application {
    private static final int WIDTH = 20;
    private static final int HEIGHT = 20;
    private static final int SIZE = 20;
    private static final int SPEED = 5;

    private List<Rectangle> snake;
    private Rectangle food;
    private int dx;
    private int dy;
    private boolean gameOver;

    @Override
    public void start(Stage stage) {
        Pane root = new Pane();
        snake = new ArrayList<>();
        createSnake();
        createFood();

        AnimationTimer timer = new AnimationTimer() {
            @Override
            public void handle(long now) {
                if (!gameOver) {
                    moveSnake();
                    checkCollisions();
                }
            }
        };
        timer.start();

        root.getChildren().addAll(snake);
        root.getChildren().add(food);

        Scene scene = new Scene(root, WIDTH * SIZE, HEIGHT * SIZE);
        scene.setOnKeyPressed(e -> {
            KeyCode key = e.getCode();
            switch (key) {
                case UP:
                    if (dy != SPEED) {
                        dx = 0;
                        dy = -SPEED;
                    }
                    break;
                case DOWN:
                    if (dy != -SPEED) {
                        dx = 0;
                        dy = SPEED;
                    }
                    break;
                case LEFT:
                    if (dx != SPEED) {
                        dx = -SPEED;
                        dy = 0;
                    }
                    break;
                case RIGHT:
                    if (dx != -SPEED) {
                        dx = SPEED;
                        dy = 0;
                    }
                    break;
            }
        });

        stage.setScene(scene);
        stage.show();
    }

    private void createSnake() {
        for (int i = 0; i < 5; i++) {
            Rectangle rect = new Rectangle(SIZE * 5 + i * SIZE, SIZE * 5, SIZE, SIZE);
            rect.setFill(Color.BLUE);
            snake.add(rect);
        }
    }

    private void createFood() {
        Random random = new Random();
        int x = random.nextInt(WIDTH);
        int y = random.nextInt(HEIGHT);
        food = new Rectangle(x * SIZE, y * SIZE, SIZE, SIZE);
        food.setFill(Color.RED);
    }

    private void moveSnake() {
        for (int i = snake.
