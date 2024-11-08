import torch.nn as nn
import torch.nn.functional as F

class SimpleCNN(nn.Module):
    def __init__(self):
        super(SimpleCNN, self).__init__()

        # First convolutional layer (input channels = 1 for grayscale xray, output channels = 16)
        self.conv1 = nn.Conv2d(in_channels=1, out_channels=16, kernel_size=3, stride=1, padding=1)

        # Second convolutional layer (input channels = 16, output channels = 32)
        self.conv2 = nn.Conv2d(in_channels=16, out_channels=32, kernel_size=3, stride=1, padding=1)

        # Max pooling layer (2x2)
        self.pool = nn.MaxPool2d(kernel_size=2, stride=2, padding=0)

        # Fully connected layers
        self.fc1 = nn.Linear(32 * 100 * 75, 128)  # After two 2x2 poolings, the image becomes 100x75
        self.fc2 = nn.Linear(128, 3)

    def forward(self, x):
        # Apply first convolution + ReLU + max pooling
        x = self.pool(F.relu(self.conv1(x)))

        # Apply second convolution + ReLU + max pooling
        x = self.pool(F.relu(self.conv2(x)))

        # Flatten the output for the fully connected layers
        x = x.view(-1, 32 * 100 * 75)

        # Fully connected layer + ReLU
        x = F.relu(self.fc1(x))

        # Output layer -CrossEntropyLoss
        x = self.fc2(x)

        return x
