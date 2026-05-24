<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Devoir - {{ $title }}</title>
    <style>
        body {
            font-family: 'DejaVu Sans', sans-serif;
            padding: 30px;
            color: #333;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #002366;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #002366;
            margin: 0;
            font-size: 24px;
        }
        .info {
            margin-bottom: 30px;
            background: #f5f5f5;
            padding: 15px;
            border-radius: 10px;
        }
        .info p {
            margin: 8px 0;
        }
        .content {
            margin: 30px 0;
            padding: 20px;
            border-left: 3px solid #002366;
        }
        .footer {
            text-align: center;
            margin-top: 50px;
            padding-top: 20px;
            border-top: 1px solid #ccc;
            font-size: 10px;
            color: #999;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>📄 Fiche de Devoir</h1>
        <p>{{ $title }}</p>
    </div>

    <div class="info">
        <p><strong>👨‍🏫 Professeur :</strong> {{ $professor }}</p>
        <p><strong>📅 Date limite :</strong> {{ $deadline }}</p>
        <p><strong>⏰ Statut :</strong> {{ $status }}</p>
        <p><strong>👤 Étudiant :</strong> {{ $student_name }}</p>
        <p><strong>📚 Classe :</strong> {{ $student_class }}</p>
    </div>

    <div class="content">
        <h3>📝 Description</h3>
        <p>{{ $description }}</p>
    </div>

    <div class="footer">
        <p>Amity School - Système de Gestion Scolaire</p>
        <p>Document généré le {{ $date }}</p>
    </div>
</body>
</html>
