import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const API_URL = 'https://api.deepseek.com/v1/chat/completions';  // 注意：这是示例URL，需要根据实际API文档调整

async function askDeepSeek(question: string): Promise<string> {
    console.log('正在发送请求到 DeepSeek API...');
    try {
        const startTime = Date.now();
        const response = await axios.post(API_URL, {
            messages: [{ role: 'user', content: question }],
            model: 'deepseek-chat',  // 根据实际API文档调整模型名称
        }, {
            headers: {
                'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
                'Content-Type': 'application/json',
            }
        });
        const endTime = Date.now();
        console.log(`请求耗时: ${(endTime - startTime) / 1000} 秒`);

        return response.data.choices[0].message.content;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API请求错误:', error.response?.data || error.message);
        } else {
            console.error('发生错误:', error);
        }
        throw error;
    }
}

// 示例使用
async function main() {
    try {
        const question = '你是谁?';
        console.log('问题:', question);
        const answer = await askDeepSeek(question);
        console.log('回答:', answer);
    } catch (error) {
        console.error('程序执行出错');
    }
}

main();
