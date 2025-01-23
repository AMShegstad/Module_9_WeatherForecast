import { Router }  from 'express';
const router = Router();

router.get('/', (req, res) => {
    res.json({ message: 'test-passed!' });
    console.log('Route is Working');
});

export default router;
