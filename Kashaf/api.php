<?php
header('Content-Type: application/json');
$dataFile = __DIR__ . '/reviews.json';   // <— use absolute path
$method = $_SERVER['REQUEST_METHOD'];
$reviews = file_exists($dataFile) ? json_decode(file_get_contents($dataFile), true) : [];

function saveReviews($reviews, $dataFile) {
    file_put_contents($dataFile, json_encode($reviews, JSON_PRETTY_PRINT));
}

switch ($_GET['action'] ?? '') {

    case 'create':
        $newReview = json_decode(file_get_contents('php://input'), true);
        $newReview['id'] = uniqid();
        $newReview['timestamp'] = time();
        $reviews[] = $newReview;
        saveReviews($reviews, $dataFile);
        echo json_encode(['status' => 'success']);
        break;

    case 'read':
        $total = count($reviews);
        $avg = $total ? array_sum(array_column($reviews, 'rating')) / $total : 0;
        $stars = array_count_values(array_column($reviews, 'rating'));
        for ($i = 1; $i <= 5; $i++) {
            $stars[$i] = $stars[$i] ?? 0;
        }
        echo json_encode(['reviews' => $reviews, 'average' => round($avg, 2), 'stars' => $stars]);
        break;

    case 'update':
        $updateData = json_decode(file_get_contents('php://input'), true);
        foreach ($reviews as &$review) {
            if ($review['id'] === $updateData['id']) {
                $review['name'] = $updateData['name'];
                $review['rating'] = $updateData['rating'];
                $review['comment'] = $updateData['comment'];
                break;
            }
        }
        saveReviews($reviews, $dataFile);
        echo json_encode(['status' => 'updated']);
        break;

    case 'delete':
        $deleteId = $_GET['id'] ?? '';
        $reviews = array_filter($reviews, fn($r) => $r['id'] !== $deleteId);
        saveReviews(array_values($reviews), $dataFile);
        echo json_encode(['status' => 'deleted']);
        break;

    default:
        echo json_encode(['error' => 'Invalid action']);
}
?>