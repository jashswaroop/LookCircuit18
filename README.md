# LookCircuit

AI-Powered Personal Fashion Consultant and Smart Shopping Assistant

## Features

- **Style Analysis**: Skin tone (Fitzpatrick I-VI), face shape, undertone detection
- **Personalized Recommendations**: Color palettes, necklines, patterns, grooming tips
- **Occasion Styling**: Complete outfit suggestions for 7+ occasions
- **Product Discovery**: Curated fashion products matching your style profile

## Quick Start

### Backend

```bash
cd lookcircuit-backend

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your Supabase credentials

# Run development server
uvicorn app.main:app --reload
```

### Mobile App

```bash
cd lookcircuit-mobile

# Install dependencies
npm install

# Start Expo
npm start
```

### Docker

```bash
# Build and run with Docker Compose
docker-compose up -d
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/analysis/face` | POST | Analyze face from uploaded image |
| `/api/v1/recommendations/generate` | POST | Generate style recommendations |
| `/api/v1/recommendations/occasion/{type}` | GET | Get outfit for occasion |
| `/api/v1/products/discover` | POST | Discover matching products |

## Tech Stack

- **Backend**: FastAPI, Python 3.11, MediaPipe
- **Auth**: Supabase
- **Mobile**: React Native (Expo)
- **AI**: Custom classifiers for skin/face analysis

## Testing

```bash
# Run all tests
cd lookcircuit-backend
python simple_test.py

# Performance benchmarks
python tests/test_performance.py
```

## License

MIT
